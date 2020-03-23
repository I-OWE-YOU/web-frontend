<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      :id="fieldName"
      v-model="modelValue"
      :inputmode="inputmode"
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
    inputmode: {
      type: String,
      default: null,
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
  width: 100%;
  margin: $size-input-wrapper-margin;
  outline: none;

  label,
  input[type='text'] {
    display: block;
    margin: 0;
  }

  label {
    position: absolute;
    top: 0;
    left: 1rem;
    padding: 1rem + 2 * $size-input-border;
    overflow: hidden;
    font-size: $size-input-font;
    line-height: 1.5;
    color: $color_blue_dark;
    white-space: nowrap;
    pointer-events: none;
    background-color: transparent;
    transition: all 0.2s linear;
  }

  &.focused label {
    top: -4rem;
    color: white;
    transition: all 0.2s linear;
  }

  input[type='text'] {
    @include inputtextstyle();
  }
}
</style>
