<template>
  <div class="entrepreneur-flow-step">
    <h1 v-text="questionText" />

    <p v-show="errorMessage" class="error">{{ errorMessage }}</p>

    <form action="#">
      <slot></slot>

      <button
        :disabled="isFormInvalid"
        type="button"
        @click="$emit('buttonClicked')"
        >{{ buttonText }}</button
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'EntrepreneurFlowStepTemplate',
  components: {},
  props: {
    questionText: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Volgende',
    },
    isFormInvalid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

.entrepreneur-flow-step {
  #tegoedje {
    max-height: 65px;
    margin: 2em 0 3em;
  }

  h1 {
    max-width: 260px;
    margin: 1em auto 2em;
  }

  p.error {
    max-width: 275px;
    padding: 12px 24px;
    margin: 0 auto;
    line-height: 1.6;
    color: white;
    background-color: $color-blue-dark;
    border-radius: 6px;
  }

  button {
    @include buttonstyle();

    margin: 1rem 0;
    border: none;
  }
}
</style>
