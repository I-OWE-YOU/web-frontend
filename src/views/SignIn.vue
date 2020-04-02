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

      <span
        v-if="errors.includes(ErrorType.USER_NOT_FOUND_EXCEPTION)"
        class="p-3 d-block text-danger"
        >User does not exist. Please check your credentials.</span
      >

      <button type="button" class="m-4 big-red-button" @click="signIn"
        >Sign In</button
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
