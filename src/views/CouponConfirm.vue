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
import { API } from 'aws-amplify'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
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
      amount: null,
      companyId: null,
      company: null,
      stripe: null,
      stripeSession: null,
      email: '',
      errors: [],
      ErrorType: ErrorType,
      termsAndConditionsAccepted: false,
    }
  },
  async mounted() {
    // Convert the amount in cents
    this.amount = this.$route.query.amount * 100
    this.companyId = this.$route.params.companyId

    await this.loadCompany()
    await this.configureStripe()
  },
  methods: {
    async loadCompany() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/company/${this.companyId}`
        )

        this.company = response.data
      } catch (e) {
        alert('There has been an error')
      }
    },
    async configureStripe() {
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY, {
        stripeAccount: this.company.stripeUserId,
      })
    },
    async createCheckoutSession() {
      const response = await API.post(
        'BackendAPIDev',
        `/stripe/checkout-session`,
        {
          body: {
            amount: this.amount,
            companyId: this.companyId,
            customerEmail: this.email,
          },
        }
      )

      this.stripeSession = response
    },
    async submitPayment() {
      const result = await this.stripe.redirectToCheckout({
        sessionId: this.stripeSession.id,
      })

      if (result.error) {
        alert('There has been an error')
      }
    },
    async checkForm(e) {
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
        await this.createCheckoutSession()
        this.submitPayment()
        return null
      }
    },
  },
}
</script>

<style lang="scss">
@import '@design';
</style>
