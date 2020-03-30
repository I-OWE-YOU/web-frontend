<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      :id="fieldName"
      v-model="modelValue"
      :inputmode="inputmode"
      :type="fieldType"
      :name="fieldName"
      :aria-describedby="description ? fieldName + 'Desc' : ''"
      :required="required"
      class="text-field-input"
      @focus="fieldFocused"
      @blur="fieldBlurred"
    />
    <p :id="fieldName + 'Desc'">{{ description }}</p>
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
    fieldType: {
      type: String,
      default: 'text',
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
    required: {
      type: Boolean,
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
    requiredAttrValue() {
      return this.required ? 'required' : null
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
  input[type='text'],
  input[type='password'] {
    display: block;
    margin: 0;
    border-radius: 0;
  }

  label {
    @include responsive-in-small-screens();

    position: absolute;
    top: 0;
    left: 50%;
    padding: 1rem + 2 * $size-input-border;
    overflow: hidden;
    font-size: $size-input-font;
    line-height: 1.5;
    color: $color-input;
    white-space: nowrap;
    pointer-events: none;
    background-color: transparent;
    transition: all 0.2s linear;
    transform: translateX(-50%);
  }

  &.focused label {
    top: -4rem;
    color: white;
    transition: all 0.2s linear;
  }

  input[type='text'],
  input[type='password'] {
    @include inputtextstyle();
  }
}
</style>
