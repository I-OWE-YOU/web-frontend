<template>
  <div>
    <form
      class="input-group flex-column align-items-center"
      novalidate="true"
      @submit.prevent
    >
      <h1 class="p-3">Log in als ondernemer</h1>
      <FormField
        v-model="email"
        field-name="email"
        placeholder="Email"
        filed-type="email"
        inputmode="email"
        :required="true"
      />

      <FormField
        v-model="password"
        field-name="password"
        placeholder="Password"
        field-type="password"
        :required="true"
      />

      <span
        v-if="errors.includes(ErrorType.USER_NOT_FOUND_EXCEPTION)"
        class="p-3 d-block text-danger"
        >Een van de bovenstaande gegevns kloppen niet. Vul het juiste email
        adres of wachtwoord in.</span
      >

      <div class="flex-fill"></div>

      <button
        type="button"
        class="m-4 btn btn-red big-red-button"
        @click="signIn"
        >Log in</button
      >
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import FormField from '@components/FormField.vue'
import { ErrorType, AuthStateValue } from './constants'

export default {
  name: 'SignIn',
  components: { FormField },
  data() {
    return {
      email: '',
      password: '',
      ErrorType: ErrorType,
      errors: [],
    }
  },
  methods: {
    async signIn() {
      try {
        await Auth.signIn(this.email, this.password)
        AmplifyEventBus.$emit('authState', AuthStateValue.SIGNED_IN)
      } catch (e) {
        if (e.code === ErrorType.USER_NOT_FOUND_EXCEPTION) {
          this.errors.push(ErrorType.USER_NOT_FOUND_EXCEPTION)
        }
        console.error(e)
      }
    },
  },
}
</script>
