<template>
  <div>
    <form
      novalidate="true"
      class="input-group flex-column align-items-center"
      @submit.prevent
    >
      <h2 class="p-3">Mijn onderneming inschrijven</h2>
      <FormField
        v-model="email"
        field-name="email"
        placeholder="Email adres"
        filed-type="email"
        inputmode="email"
        :required="true"
      />
      <span v-if="errors.includes(ErrorType.EMAIL_REQUIRED)" class="text-danger"
        >We hebben een juist e-mail adres nodig</span
      >
      <span v-if="errors.includes(ErrorType.EMAIL_INVALID)" class="text-danger"
        >Het e-mailadres of wachtwoord klopt niet. probeer het nog eens.</span
      >

      <FormField
        v-model="emailConfirm"
        field-name="emailConfirm"
        placeholder="E-mail adres bevestigen"
        filed-type="email"
        inputmode="email"
        :required="true"
      />
      <span
        v-if="errors.includes(ErrorType.EMAIL_DOESNT_MATCH)"
        class="text-danger"
        >Het e-mailadres komt niet overeen.</span
      >

      <FormField
        v-model="password"
        field-name="password"
        placeholder="Password"
        field-type="password"
        :required="true"
      />
      <span
        v-if="errors.includes(ErrorType.PASSWORD_REQUIRED)"
        class="text-danger"
        >Er is geen wachtwoord ingevoerd.</span
      >
      <span
        v-if="errors.includes(ErrorType.PASSWORD_INVALID)"
        class="text-danger"
        >Ongeldig wachtwoord. Minimale lengte is 12 tekens.</span
      >

      <FormField
        v-model="passwordConfirm"
        field-name="passwordConfirm"
        placeholder="Wachtwoord"
        field-type="password"
        :required="true"
      />

      <span
        v-if="errors.includes(ErrorType.PASSWORD_DOESNT_MATCH)"
        class="text-danger"
        >Het wachtwoord komt niet overeen</span
      >

      <CheckBoxTermsAndConditions v-model="termsAndConditionsAccepted" />
      <span
        v-if="errors.includes(ErrorType.TERMS_REQUIRED)"
        class="p-3 d-block text-danger"
        >Accepteer de algemene voorwaarde om door te kunnen gaan.</span
      >

      <span
        v-if="errors.includes(ErrorType.USER_NAME_EXISTS_EXCEPTION)"
        class="m-5 d-block text-danger"
        >Er bestaat al een account met dit e-mailadres.</span
      >

      <button class="m-4 btn btn-red big-red-button" @click="checkForm"
        >Verder</button
      >
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { AuthStateValue } from '@views/constants'
import CheckBoxTermsAndConditions from '@components/CheckBoxTermsAndConditions.vue'
import FormField from '@components/FormField.vue'
import { isValidEmail } from '@utils/validation'

import { ErrorType } from './constants'

export default {
  name: 'SignUp',
  components: { CheckBoxTermsAndConditions, FormField },
  data() {
    return {
      ErrorType: ErrorType,
      termsAndConditionsAccepted: false,
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      errors: [],
    }
  },
  computed: {
    isFormInvalid: function() {
      return (
        !this.isEmailValid(this.email) ||
        !(this.email === this.emailConfirm) ||
        !this.isPasswordValid(this.password) ||
        !(this.password === this.passwordConfirm) ||
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
        AmplifyEventBus.$emit('authState', AuthStateValue.SIGNED_IN)
      } catch (e) {
        if (e.code === ErrorType.USER_NAME_EXISTS_EXCEPTION) {
          this.errors.push(ErrorType.USER_NAME_EXISTS_EXCEPTION)
        }
      }
    },
    checkForm: function(e) {
      this.errors = []

      if (!this.email) {
        this.errors.push(ErrorType.EMAIL_REQUIRED)
      } else if (!isValidEmail(this.email)) {
        this.errors.push(ErrorType.EMAIL_INVALID)
      } else if (this.email !== this.emailConfirm) {
        this.errors.push(ErrorType.EMAIL_DOESNT_MATCH)
      }

      if (!this.password) {
        this.errors.push(ErrorType.PASSWORD_REQUIRED)
      } else if (!this.isPasswordValid(this.password)) {
        this.errors.push(ErrorType.PASSWORD_INVALID)
      } else if (this.password !== this.passwordConfirm) {
        this.errors.push(ErrorType.PASSWORD_DOESNT_MATCH)
      }

      if (!this.termsAndConditionsAccepted) {
        this.errors.push(ErrorType.TERMS_REQUIRED)
      }

      if (!this.errors.length) {
        return this.signUpAndSignIn()
      }
    },
    isPasswordValid(password) {
      return password.length >= 12
    },
  },
}
</script>
