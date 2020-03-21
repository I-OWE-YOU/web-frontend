<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      v-model="modelValue"
      type="text"
      :name="fieldName"
      :aria-describedby="description ? fieldName + 'Desc' : ''"
      class="text-field-input"
      @focus="fieldFocused"
      @blur="fieldBlurred"
    />
    <p :id="fieldName + 'Desc'">
      {{ description }}
    </p>
  </div>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'FormField',
  props: {
    value: {
      type: String,
      default: '',
    },
    fieldName: {
      type: String,
      default: '',
    },
    fieldLabel: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      state: 'idle',
    }
  },
  computed: {
    focused() {
      return this.value || this.state === 'focus' ? 'focused' : ''
    },
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        EventBus.$emit('valueChange')
        this.$emit('input', val)
      },
    },
  },
  methods: {
    fieldFocused() {
      this.state = 'focus'
    },
    fieldBlurred() {
      this.state = 'blur'
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

.field-wrapper {
  position: relative;
  display: block;
  width: 317px;
  margin: 50px auto 20px;
  outline: none;

  label,
  input[type='text'] {
    display: block;
    margin: 0;
    line-height: 2.6rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 14px; // 4px for the border
    overflow: hidden;
    font-size: 1.4rem;
    color: $color_blue_dark;
    white-space: nowrap;
    pointer-events: none;
    background-color: transparent;
    transition: all 0.2s linear;
  }

  &.focused label {
    top: -40px;
    color: white;
    transition: all 0.2s linear;
  }

  input[type='text'] {
    padding: 10px;
    font-size: 2.6rem;
    color: #000;
    background-color: #fff;
    border: 2px solid transparent;
    border-radius: 6px;

    &:focus {
      border: 2px solid $color-blue-dark;
    }
  }
}
</style>
