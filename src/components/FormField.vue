<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      type="text"
      :name="fieldName"
      :value="fieldValue"
      @input="storeValue"
      @focus="focused = 'focused'"
      @blur="focused = fieldValue ? 'focused' : ''"
      class="text-field-input"
      :aria-describedby="description ? fieldName+'Desc' : ''"
    />
    <p :id="fieldName+'Desc'">{{description}}</p>
  </div>
</template>

<script>
export default {
  name: "FormField",
  data: function() {
    return {
      focused: ""
    };
  },
  watch: {
    fieldValue: function() {
      this.$emit("change:" + this.fieldName, true);
    }
  },
  props: {
    fieldName: String,
    fieldValue: String,
    fieldLabel: String,
    description: String
  },
  methods: {
    storeValue(e) {
      this.$emit("update:" + this.fieldName, e.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.field-wrapper {
  display: block;
  margin: 50px 0 20px;
  position: relative;
  outline: none;
  width: 100%;

  &.focused label {
    transition: all 0.2s linear;
    top: -40px;
    color: white;
  }

  label {
    white-space: nowrap;
    overflow: hidden;
    font-size: 1em;
    position: absolute;
    pointer-events: none;
    top: 8px;
    left: 0;
    right: 0;
    display: inline-block;
    margin: 8px 5px 8px -180px;
    line-height: 1.4em;
    padding: 0 10px;
    transition: all 0.2s linear;
    color: $color_blue_dark;
    background-color: transparent;
  }

  input[type="text"],
  input[type="email"] {
    @include inputtextstyle();
    margin: 0;
    padding: 10px;
    max-width: 303px;
    border: 2px solid transparent;

    &:focus {
      border: 2px solid $color_blue_dark;
    }
  }

  &.multiple2 input[type="text"],
  &.multiple2 input[type="email"] {
    max-width: 140px;
  }
}
</style>