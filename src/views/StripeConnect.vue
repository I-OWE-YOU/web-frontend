<template>
  <div>
    <h1>Stripe Connect</h1>
    <div>
      <button @click="getConnectUrl">Connect</button>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'

export default {
  name: 'StripeConnect',
  methods: {
    async getConnectUrl() {
      try {
        const res = await API.get('BackendAPIDev', '/stripe/connect', {})
        window.location.href = res
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
