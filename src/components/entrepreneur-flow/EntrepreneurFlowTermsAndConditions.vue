<template>
  <EntrepreneurFlowStepTemplate
    question-text="Laatste stap. Echt. Alleen nog even een akkoord."
    button-text="Afronden"
    :is-form-invalid="!isTermsChecked"
    @buttonClicked="emitFlowNavigate"
  >
    <input id="cbTermsAndCondition" v-model="isTermsChecked" type="checkbox" />
    <label for="cbTermsAndCondition">
      Ja, ik ga akkoord met de
      <a target="_blank" href="https://tegoedje.nu/voorwaarden"
        >algemene voorwaarden</a
      >
      van TEGOEDJE.NU
    </label>
  </EntrepreneurFlowStepTemplate>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import EntrepreneurFlowStepTemplate from '@components/entrepreneur-flow/EntrepreneurFlowStepTemplate.vue'

export default {
  name: 'EntrepreneurFlowTermsAndConditions',
  components: {
    EntrepreneurFlowStepTemplate,
  },
  data: () => {
    return {
      isTermsChecked: false,
    }
  },
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

label {
  @include font-size($size-content-font);

  line-height: 1.1;
}
</style>
