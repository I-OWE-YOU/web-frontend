<template>
  <div>
    <h2>Voor welk bedrag wil je een Tegoedje?</h2>
    <p>
      Kies een van de onderstaande bedragen of vul zelf een bedrag in. Hierna
      reken je het Tegoedje af en ontvang je de QR code via de mail.
    </p>
    <form class="text-dark d-flex m-auto flex-wrap align-items-center">
      <div
        v-for="val in couponValues"
        :key="val"
        class="coupon text-center py-3 my-3"
        :class="{ selected: selectedCoupon === val }"
      >
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
      <div
        class="coupon text-center py-3 my-3"
        :class="{ selected: selectedCoupon === customCoupon }"
      >
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
        <label v-else for="coupon-custom" class="coupon__custom-label"
          >Anders</label
        >
      </div>
      <div class="w-100 px-3 text-danger coupon__validation-message">
        <p v-if="isFinalAmountTouched && isAmountInvalid"
          >Een tegoedje kan minimaal 1 euro en maximaal 250 euro waard zijn.</p
        >
      </div>

      <div class="w-100 d-flex justify-content-center">
        <router-link
          :to="toConfirmLink"
          :class="{ disabled: isAmountInvalid }"
          @click="preventNavigateIfFormInvalid"
        >
          <button
            type="button"
            class="btn btn-red big-red-button"
            :disabled="isAmountInvalid"
            >Verder</button
          >
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
        isNaN(Number(this.finalAmount)) ||
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

.coupon {
  width: 33%;
  min-width: 33%;
  max-width: 33%;
  font-size: 150%;
  font-weight: 600;
  color: $dark;
  background-repeat: no-repeat;
  background-position: center;

  &:nth-child(odd) {
    background-image: url('../assets/img/coupon-odd.svg');
  }
  &:nth-child(even) {
    background-image: url('../assets/img/coupon-even.svg');
  }

  &__currency {
    color: $red;
  }

  &.selected {
    color: $primary;

    &:nth-child(odd) {
      background-image: url('../assets/img/coupon-odd.selected.svg');
    }
    &:nth-child(even) {
      background-image: url('../assets/img/coupon-even.selected.svg');
    }
    .coupon__currency {
      color: $dark;
    }
  }

  &__custom-input {
    width: 3 * $font-size-base;
    color: $primary;
    background-color: $red;
    border: none;
    border-bottom: 0.2rem solid $primary;

    &:focus {
      border-color: $primary !important;
      outline: none;
    }
  }
  &__custom-label {
    font-size: $font-size-base;
  }

  &__validation-message {
    min-height: 6rem;
  }
}
</style>
