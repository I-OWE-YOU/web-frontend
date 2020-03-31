<template>
  <div>
    <h1>Stripe Connect</h1>
    <div>
      <a href="http://localhost:3000/dev/stripe/connect">Connect</a>
      <button @click="getConnectUrl">Connect</button>
    </div>
  </div>
</template>

<script>
import { Auth, API } from 'aws-amplify'

export default {
  name: 'StripeConnect',
  async mounted() {
    console.log('HELLO')
    const user = await Auth.currentAuthenticatedUser()

    console.log(user)

    return {}
  },
  methods: {
    async getConnectUrl() {
      try {
        const res = await API.get('BackendAPIDev', '/stripe/connect')
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style scoped></style>
