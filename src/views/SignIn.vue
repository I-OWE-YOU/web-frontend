<template>
  <div>
    <form novalidate="true" @submit.prevent>
      <h1 class="p-3">Sign In</h1>
      <FormField
        v-model="email"
        field-name="email"
        field-label="Email"
        filed-type="email"
        inputmode="email"
        :required="true"
      />

      <FormField
        v-model="password"
        field-name="password"
        field-label="Password"
        field-type="password"
        :required="true"
      />

      <button class="m-4" @click="signIn">Sign In</button>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import FormField from '@components/FormField.vue'
import { routes } from '@router/routes'

export default {
  name: 'SignIn',
  components: { FormField },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signIn() {
      try {
        await Auth.signIn(this.email, this.password)
        this.navigateToEntrepreneur()
      } catch (e) {
        console.error(e)
      }
    },
    async navigateToEntrepreneur() {
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        this.$router.push(routes.entrepreneur)
      }
    },
  },
}
</script>
