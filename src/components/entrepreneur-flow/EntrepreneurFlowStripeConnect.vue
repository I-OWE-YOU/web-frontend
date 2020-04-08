<template>
  <div class="d-flex flex-column align-items-center flex-fill">
    <h2>Direct en veilig je geld ontvangen</h2>

    <p>
      Om elke betaling veilig, transparant en snel te laten gebeuren, hebben we
      gekozen voor het betrouwbare en onafhankelijke betaalplatform Stripe
    </p>
    <p>
      Om verder te gaan, hoef je dus alleen een gratis account bij Stripe aan te
      maken.
    </p>

    <div class="flex-fill"></div>

    <button
      class="btn btn-red big-red-button"
      type="button"
      :disabled="isLoading"
      @click="redirectToConnectUrl"
    >
      <Loader v-if="isLoading"></Loader>
      <span v-if="!isLoading">Ga naar Stripe</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import { Auth } from 'aws-amplify'
import Loader from '@components/Loader.vue'

export default {
  name: 'EntrepreneurFlowStripeConnect',
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async redirectToConnectUrl() {
      this.isLoading = true

      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/stripe/connect`,
          {
            headers: {
              Authorization: (await Auth.currentSession())
                .getIdToken()
                .getJwtToken(),
            },
          }
        )
        window.location.href = res.data
      } catch (e) {
        this.isLoaded = false
        console.error(e)
      }
    },
  },
}
</script>
