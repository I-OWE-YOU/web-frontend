<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldDescription }}</label>
    <input
      type="text"
      :name="fieldName"
      :value="fieldValue"
      @input="storeValue"
      @focus="focused = 'focused'"
      @blur="focused = ''"
      class="text-field-input"
    />
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
  props: {
    fieldName: String,
    fieldValue: String,
    fieldDescription: String
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
    left: 70px;
  }

  label {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    font-size: 1em;
    position: absolute;
    top: -40px;
    left: 90px;
    display: inline-block;
    margin: 8px 5px;
    line-height: 1.4em;
    padding: 0 10px;
    transition: all 0.2s linear;
    color: white;
    background-color: transparent;
  }

  input[type="text"],
  input[type="email"] {
    @include inputtextstyle();
    margin: 0;
    padding: 10px;
    max-width: 303px;
    border: 1px solid #b5b5b5;
  }

  &.multiple2 input[type="text"],
  &.multiple2 input[type="email"] {
    max-width: 140px;
  }
}
</style>