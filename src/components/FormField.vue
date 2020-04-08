<template>
  <div class="w-100" :class="focused">
    <input
      v-model="modelValue"
      :inputmode="inputmode"
      :type="fieldType"
      :name="fieldName"
      :aria-describedby="description ? fieldName + 'Desc' : ''"
      :required="required"
      :placeholder="placeholder"
      class="form-control input__text"
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
    placeholder: {
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

<style lang="scss">
.input__text {
  &::placeholder {
    opacity: 0.5 !important;
  }
}
</style>
