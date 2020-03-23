<template>
  <EntrepreneurFlowStepTemplate
    question-text="Geweldig! Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen."
    @buttonClicked="emitFlowNavigate"
  ></EntrepreneurFlowStepTemplate>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import EntrepreneurFlowStepTemplate from '@components/entrepreneur-flow/EntrepreneurFlowStepTemplate.vue'

export default {
  name: 'EntrepreneurFlowIntro',
  components: {
    EntrepreneurFlowStepTemplate,
  },
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
  },
}
</script>
