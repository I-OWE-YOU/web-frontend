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
import { API } from 'aws-amplify'
import { loadStripe } from '@stripe/stripe-js'

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

      amount: null,
      stripe: null,
      processing: false,
      stripeSession: null,
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
    async mounted() {
      // Convert the amount in cents
      this.amount = this.$route.query.amount * 100
      await this.configureStripe()

      await this.setupIntent()
    },
    async configureStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = await loadStripe(
        `pk_test_rQgjhRnE9aSh237X1KqkIz4L00NmAKb5gf`,
        {
          stripeAccount: 'acct_1039oG2g4wtK4bmi',
        }
      )
    },
    async setupIntent() {
      const response = await API.post(
        'ServerlessOffline',
        `/stripe/checkout-session`,
        {
          body: {
            amount: this.amount,
            companyId: 'f5a24ad0-7360-11ea-a3f7-5d7cd1978569',
          },
        }
      )

      this.stripeSession = response
    },
    async submitPayment() {
      this.processing = true

      const result = await this.stripe.redirectToCheckout({
        sessionId: this.stripeSession.id,
      })

      this.processing = false

      if (result.error) {
        console.error(result.error.message)
      } else {
        console.log(result)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@design';
/**
* The CSS shown here will not be introduced in the Quickstart guide, but shows
* how you can use CSS to style your Element's container.
*/
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
