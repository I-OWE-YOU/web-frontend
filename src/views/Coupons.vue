<template>
  <div>
    <h2>Kies een bedrag</h2>
    <p>
      Kies een van de voorgeselecteerde bedragen of vul zelf een bedrag in.
      Hierna kan je het tegoedje afrekenen en sturen wij je een QR code via de
      mail
    </p>
    <form class="d-flex m-auto flex-wrap coupons">
      <div v-for="val in couponValues" :key="val" class="coupon">
        <input
          :id="'coupon-' + val"
          v-model="selectedCoupon"
          name="coupon-value"
          class="d-none"
          type="radio"
          :value="val"
        />
        <label :for="'coupon-' + val">
          <span class="coupon__currency">€</span>
          {{ val }}
        </label>
      </div>
      <div class="coupon">
        <input
          id="coupon-custom"
          v-model="selectedCoupon"
          name="coupon-value"
          class="d-none"
          type="radio"
          :value="customCoupon"
          @input="setFocusInInputIfCustomIsSelected"
        />
        <template v-if="selectedCoupon === customCoupon">
          <span class="coupon__currency">€</span>
          <input
            ref="inputCustomAmount"
            v-model="customAmount"
            class="coupon__custom-input"
            type="text"
            inputmode="numeric"
          />
        </template>
        <label v-else for="coupon-custom">Anders</label>
      </div>
      <div class="w-100 px-3 coupon__validation-message">
        <p v-if="isFinalAmountTouched && isAmountInvalid"
          >Een tegoedje kan minimaal 1 euro en maximaal 250 euro waard zijn.</p
        >
      </div>

      <div class="w-100">
        <router-link
          :to="toConfirmLink"
          :class="{ disabled: isAmountInvalid }"
          @click="preventNavigateIfFormInvalid"
        >
          <button type="button" :disabled="isAmountInvalid">Verder</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { routes } from '@router/routes'

export default {
  name: 'Coupons',
  components: {},
  data: () => {
    return {
      selectedCoupon: null,
      customAmount: null,
      customCoupon: 'custom',
      couponValues: [5, 10, 15, 25, 40],
      routes,
    }
  },
  computed: {
    toConfirmLink: function() {
      return `${routes.couponConfirm}/${this.$route.params.companyId}?amount=${this.finalAmount}`
    },
    finalAmount: function() {
      return this.selectedCoupon === this.customCoupon
        ? this.customAmount
        : this.selectedCoupon
    },
    isAmountInvalid() {
      return (
        !this.finalAmount ||
        !new RegExp('[\\d]{1,3}$').test(this.finalAmount) ||
        this.finalAmount < 1 ||
        this.finalAmount > 250
      )
    },
    isFinalAmountTouched() {
      return this.finalAmount !== null
    },
  },
  mounted() {},
  methods: {
    preventNavigateIfFormInvalid(event) {
      if (this.isAmountInvalid) {
        event.preventDefault()
      }
    },
    setFocusInInputIfCustomIsSelected(event) {
      // 'selectedCoupon' would be updated a bit after this event.
      // Due to my luck of knowledge I take shortcut of selectedCoupon
      setTimeout(() => {
        if (this.selectedCoupon === this.customCoupon) {
          this.$refs.inputCustomAmount.focus()
        }
      }, 1)
    },
  },
}
</script>

<style lang="scss">
@import '@design';
.coupons {
  input[type='radio']:checked + label {
    background-color: $color-accent;
    span {
      color: $color-text-on-accent;
    }
  }
}

.coupon {
  $coupon-padding: 1rem;

  width: calc(33% - #{2 * $coupon-padding});
  min-width: calc(33% - #{2 * $coupon-padding});
  max-width: calc(33% - #{2 * $coupon-padding});
  padding: $coupon-padding;
  font-size: $size-content-font-l;

  &__currency {
    color: $color-accent;
  }

  &__custom-input {
    width: 4rem;
    color: $color-text;
    background-color: $color-blue-dark;
    border: none;
    border-bottom: 0.2rem solid $color-text;

    &:focus {
      outline: none;
    }
  }

  &__validation-message {
    min-height: 6rem;
    color: $color-accent;
  }
}
</style>
