<template>
  <div class="d-flex flex-column flex-fill">
    <EntrepreneurFlowBusinessInfo
      v-if="step === steps.companyName"
      :entrepreneur="entrepreneur"
    ></EntrepreneurFlowBusinessInfo>
    <EntrepreneurFlowStripeConnect
      v-else-if="step === steps.stripeConnect"
    ></EntrepreneurFlowStripeConnect>

    <div v-show="isWaitingForApiResponse" id="spinner" role="presentation">
      <img src="../assets/img/timer.svg" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EntrepreneurFlowBusinessInfo from '@components/entrepreneur-flow/EntrepreneurFlowBusinessInfo.vue'
import EntrepreneurFlowStripeConnect from '@components/entrepreneur-flow/EntrepreneurFlowStripeConnect.vue'
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'Entrepreneur',
  components: {
    EntrepreneurFlowBusinessInfo,
    EntrepreneurFlowStripeConnect,
  },
  data: () => {
    return {
      step: 0,
      steps: {
        companyName: 0,
        stripeConnect: 1,
      },
      isWaitingForApiResponse: false,
      entrepreneur: {
        address: {
          city: '',
          houseNumber: '',
          street: '',
          zipCode: '',
          longitude: 0.0,
          latitude: 0.0,
        },
      },
    }
  },
  mounted() {
    EventBus.$on('EntrepreneurFlow.next', () => {
      this.step++
    })
  },
  methods: {
    postData() {
      this.isWaitingForApiResponse = true
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/companies`, this.entrepreneur)
        .then((response) => {
          this.step += 1
        })
        .catch((e) => {
          const message = e.reponse ? e.response.data : e.message
          alert(
            `Er is iets misgegaan bij het opslaan van je gegevens: '${message}'`
          )
        })
        .finally(() => {
          this.isWaitingForApiResponse = false
        })
    },
  },
}
</script>

<style lang="scss">
@import '@design';

#spinner {
  margin: 3em 0;
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
