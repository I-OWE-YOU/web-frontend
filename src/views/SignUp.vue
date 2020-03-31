<template>
  <div>
    <form novalidate="true" @submit.prevent>
      <h1 class="p-3">Schrijf je in</h1>
      <FormField
        v-model="email"
        field-name="email"
        field-label="Email"
        filed-type="email"
        inputmode="email"
        :required="true"
      />
      <span v-if="errors.includes(ErrorType.EMAIL_REQUIRED)" class="text-danger"
        >Email is required</span
      >
      <span v-if="errors.includes(ErrorType.EMAIL_INVALID)" class="text-danger"
        >Email is invalid. (example@email.com)</span
      >

      <FormField
        v-model="password"
        field-name="password"
        field-label="Password"
        field-type="password"
        :required="true"
      />
      <span
        v-if="errors.includes(ErrorType.PASSWORD_REQUIRED)"
        class="text-danger"
        >Password required</span
      >
      <span
        v-if="errors.includes(ErrorType.PASSWORD_INVALID)"
        class="text-danger"
        >Invalid password. Minimum length is 8 characters.</span
      >

      <CheckBoxTermsAndConditionsVue v-model="termsAndConditionsAccepted" />
      <span
        v-if="errors.includes(ErrorType.TERMS_REQUIRED)"
        class="p-3 d-block text-danger"
        >You must accept terms and conditions</span
      >

      <span
        v-if="errors.includes(ErrorType.USER_NAME_EXISTS_EXCEPTION)"
        class="m-5 d-block text-danger"
        >An account with the given email already exists.</span
      >

      <button class="m-4" @click="checkForm">Sign up</button>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import CheckBoxTermsAndConditionsVue from '@components/CheckBoxTermsAndConditions.vue'
import FormField from '@components/FormField.vue'
import { routes } from '@router/routes'
import { ErrorType } from './constants'

export default {
  name: 'SignUp',
  components: { CheckBoxTermsAndConditionsVue, FormField },
  data() {
    return {
      ErrorType: ErrorType,
      termsAndConditionsAccepted: false,
      email: '',
      password: '',
      errors: [],
    }
  },
  computed: {
    isFormInvalid: function() {
      return (
        !this.isEmailValid(this.email) ||
        !this.isPasswordValid(this.password) ||
        !this.termsAndConditionsAccepted
      )
    },
  },
  methods: {
    async signUpAndSignIn() {
      try {
        await Auth.signUp({
          username: this.email,
          password: this.password,
        })

        await Auth.signIn(this.email, this.password)
        this.navigateToEntrepreneur()
      } catch (e) {
        if (e.code === ErrorType.USER_NAME_EXISTS_EXCEPTION) {
          this.errors.push(ErrorType.USER_NAME_EXISTS_EXCEPTION)
        }
      }
    },
    async navigateToEntrepreneur() {
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        this.$router.push(routes.entrepreneur)
      }
    },
    checkForm: function(e) {
      this.errors = []

      if (!this.email) {
        this.errors.push(ErrorType.EMAIL_REQUIRED)
      } else if (!this.isEmailValid(this.email)) {
        this.errors.push(ErrorType.EMAIL_INVALID)
      }

      if (!this.password) {
        this.errors.push(ErrorType.PASSWORD_REQUIRED)
      } else if (!this.isPasswordValid(this.password)) {
        this.errors.push(ErrorType.PASSWORD_INVALID)
      }

      if (!this.termsAndConditionsAccepted) {
        this.errors.push(ErrorType.TERMS_REQUIRED)
      }

      if (!this.errors.length) {
        return this.signUpAndSignIn()
      }
    },
    isEmailValid(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    isPasswordValid(password) {
      return password.length > 7
    },
  },
}
</script>
