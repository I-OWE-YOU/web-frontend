<template>
  <div id="questions">
    <EntrepreneurFlowPersonName
      v-if="step === steps.personName"
      :entrepreneur="entrepreneur"
    ></EntrepreneurFlowPersonName>
    <EntrepreneurFlowBusinessInfo
      v-else-if="step === steps.companyName"
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
import EntrepreneurFlowPersonName from '@components/entrepreneur-flow/EntrepreneurFlowPersonName.vue'
import EntrepreneurFlowBusinessInfo from '@components/entrepreneur-flow/EntrepreneurFlowBusinessInfo.vue'
import EntrepreneurFlowStripeConnect from '@components/entrepreneur-flow/EntrepreneurFlowStripeConnect.vue'
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'Entrepreneur',
  components: {
    EntrepreneurFlowPersonName,
    EntrepreneurFlowBusinessInfo,
    EntrepreneurFlowStripeConnect,
  },
  data: () => {
    return {
      step: 2,
      steps: {
        personName: 0,
        companyName: 1,
        stripeConnect: 2,
      },
      isWaitingForApiResponse: false,
      entrepreneur: {
        companyName: '',
        cocNumber: '',
        contactFirstName: '',
        contactLastName: '',
        streetName: '',
        city: '',
        longitude: 0.0,
        latitude: 0.0,
        email: '',
        iban: '',
        address: {},
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
          var message = e.reponse ? e.response.data : e.message
          this.showError(
            "Er is iets misgegaan bij het opslaan van je gegevens: '" +
              message +
              "'"
          )
        })
        .finally(() => {
          this.isWaitingForApiResponse = false
        })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

#questions {
  position: relative;
  height: calc(100vh - #{$size-header-height + $size-logo-margin});
  background-color: $color-blue-dark;

  #tegoedje {
    width: 30%;
    margin: 3em 0 3em;
  }

  #spinner {
    margin: 3em 0;
    animation: rotation 2s infinite linear;
  }

  button {
    margin: 1rem 0;
  }
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
