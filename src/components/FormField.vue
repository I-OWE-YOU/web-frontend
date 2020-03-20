<template>
  <div class="field-wrapper" :class="focused">
    <label :for="fieldName">{{ fieldLabel }}</label>
    <input
      type="text"
      :name="fieldName"
      v-model="modelValue"
      @focus="fieldFocused"
      @blur="fieldBlurred"
      :aria-describedby="description ? fieldName+'Desc' : ''"
      class="text-field-input"
    />
    <p :id="fieldName+'Desc'">{{description}}</p>
  </div>
</template>

<script>
export default {
  name: "FormField",
  data() {
    return { 
      state: 'idle'
    }
  },
  props: {
    value:  {
      type: String,
      default: ''
    },
    fieldName: {
      type: String,
      default: ''
    },
    fieldLabel: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
  },
  computed: {
    focused () {
      return this.value || this.state === 'focus' ? "focused" : ""
    },
    modelValue: {
      get() { 
        return this.value; 
      },
      set(val) { 
        this.$emit("input", val ) 
      }
    }
  },
  methods: {
    fieldFocused() {
      this.state = "focus";
    },
    fieldBlurred() {
      this.state = "blur";
    }
  }
};
</script>

<style scoped lang="scss">
.field-wrapper {
  position: relative;
  display: block;
  margin: 50px auto 20px;
  position: relative;
  outline: none;
  width: 300px;

  &.focused label {
    transition: all 0.2s linear;
    top: -40px;
    color: white;
  }
  
  label, input[type="text"] {
    display: block;
    margin: 0;
    line-height: 2.6rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    pointer-events: none;
    font-size: 1em;
    padding: 14px; // 4px for the border
    color: $color_blue_dark;
    background-color: transparent;
    transition: all 0.2s linear;
  }

  input[type="text"] {
    background-color: $color_white;
    color: $color_black;
    border-radius: 6px;
    font-size: 2.6rem;
    
    padding: 10px;
    width: calc( 100% - 20px - 4px ); // 20px for padding - 4px for borders (this should be solved better by border-box and all)
    border: 2px solid transparent;

    &:focus {
      border: 2px solid $color_blue_dark;
    }
  }
}
</style>