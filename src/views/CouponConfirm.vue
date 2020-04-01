<template>
  <div>
    <form novalidate="true" @submit.prevent>
      <h1 class="p-3">Vul je email adres in om je Tegoedje te ontvangen</h1>
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
        >Vul een juist email adres in</span
      >

      <CheckBoxTermsAndConditions v-model="termsAndConditionsAccepted" />
      <span
        v-if="errors.includes(ErrorType.TERMS_REQUIRED)"
        class="p-3 d-block text-danger"
        >Accepteer de algemene voorwaarde om door te kunnen gaan</span
      >

      <button type="button" class="m-4 big-red-button" @click="checkForm"
        >Verder naar betalen</button
      >
    </form>
  </div>
</template>

<script>
import { isValidEmail } from '@utils/validation'
import FormField from '@components/FormField.vue'
import CheckBoxTermsAndConditions from '@components/CheckBoxTermsAndConditions.vue'

import { ErrorType } from './constants'

export default {
  name: 'CouponConfirm',
  components: {
    FormField,
    CheckBoxTermsAndConditions,
  },
  data: () => {
    return {
      email: '',
      errors: [],
      ErrorType: ErrorType,
      termsAndConditionsAccepted: false,
    }
  },
  methods: {
    checkForm(e) {
      this.errors = []

      if (!this.email) {
        this.errors.push(ErrorType.EMAIL_REQUIRED)
      } else if (!isValidEmail(this.email)) {
        this.errors.push(ErrorType.EMAIL_INVALID)
      }

      if (!this.termsAndConditionsAccepted) {
        this.errors.push(ErrorType.TERMS_REQUIRED)
      }

      if (!this.errors.length) {
        // TODO - process to payment
        return null
      }
    },
  },
}
</script>

<style lang="scss">
@import '@design';
</style>
