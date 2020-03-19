<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      type="text"
      :name="fieldName"
      :value="fieldValue"
      @input="storeValue"
      @focus="fieldFocused"
      @blur="fieldBlurred"
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
      focused: this.fieldValue ? "focused" : ""
    };
  },
  watch: {
    fieldValue: function(e) {
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
    },
    fieldFocused() {
      this.focused = "focused";
    },
    fieldBlurred() {
      this.focused = this.fieldValue ? "focused" : "";
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

  input[type="text"] {
    @include inputtextstyle();
    margin: 0;
    padding: 10px;
    max-width: 303px;
    border: 2px solid transparent;

    &:focus {
      border: 2px solid $color_blue_dark;
    }
  }
}
</style>