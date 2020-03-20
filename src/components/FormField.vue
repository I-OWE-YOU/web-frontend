<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      type="text"
      :name="fieldName"
      :value="fieldValue"
      class="text-field-input"
      :aria-describedby="description ? fieldName + 'Desc' : ''"
      @input="storeValue"
      @focus="fieldFocused"
      @blur="fieldBlurred"
    />
    <p :id="fieldName + 'Desc'">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    fieldName: {
      type: String,
      default: '',
    },
    fieldValue: {
      type: String,
      default: '',
    },
    fieldLabel: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  data: function() {
    return {
      focused: this.fieldValue ? 'focused' : '',
    }
  },
  watch: {
    fieldValue: function() {
      this.$emit('change:' + this.fieldName, true)
    },
  },
  methods: {
    storeValue(e) {
      this.$emit('update:' + this.fieldName, e.target.value)
    },
    fieldFocused() {
      this.focused = 'focused'
    },
    fieldBlurred() {
      this.focused = this.fieldValue ? 'focused' : ''
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
  margin: 50px 0 20px;
  outline: none;

  label {
    position: absolute;
    top: 8px;
    right: 0;
    left: 0;
    display: inline-block;
    padding: 0 10px;
    margin: 8px 5px 8px -180px;
    overflow: hidden;
    font-size: 1em;
    line-height: 1.4em;
    color: $color-blue-dark;
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
    @include inputtextstyle();

    max-width: 303px;
    padding: 10px;
    margin: 0;
    border: 2px solid transparent;

    &:focus {
      border: 2px solid $color-blue-dark;
    }
  }
}
</style>
