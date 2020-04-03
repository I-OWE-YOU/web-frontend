<template>
  <form>
    <h1 class="m-0">Jouw bedrijfs gegevens</h1>

    <FormField
      v-model="entrepreneur.address.zipCode"
      field-name="zipCode"
      field-label="Postcode van je bedrijf"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.address.houseNumber"
      field-name="houseNumber"
      field-label="Huis nummer"
      :required="true"
    />
    <div v-if="isAddressChecked && !errors.length" class="pt-5">
      <p>
        {{ entrepreneur.streetName }}
        {{ entrepreneur.address.houseNumber }}
      </p>
      <p>{{ entrepreneur.city }} {{ entrepreneur.address.zipCode }}</p>
    </div>
    <div v-if="isAddressChecked && errors.includes(ErrorType.CANT_FETCH_ADDRESS)" class="pt-5">
      <p class="text-danger">We can't fetch this address. Please try again</p>
    </div>

    <div class="company-details__buttons">
      <button class="big-red-button" type="button" @click="checkAddress">Adres controleren</button>
      <button
        class="big-red-button"
        :disabled="!isAddressChecked || errors.length !== 0"
        type="button"
        @click="emitFlowNavigate"
      >Volgende</button>
    </div>
  </form>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import FormField from '@components/FormField.vue'
import { API } from 'aws-amplify'
import { ErrorType } from '@views/constants'

export default {
  name: 'EntrepreneurFlowBusinessInfo',
  components: {
    FormField,
  },
  props: {
    entrepreneur: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isAddressChecked: false,
      ErrorType: ErrorType,
      errors: [],
    }
  },
  computed: {
    isFormInvalid: function() {
      return (
        !this.isValidZipCode(this.entrepreneur.address.zipCode) ||
        !this.isValidHouseNumber(this.entrepreneur.address.houseNumber)
      )
    },
  },
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
    isValidZipCode(z) {
      const ze = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
      return ze.test(z)
    },
    isValidHouseNumber(num) {
      return !!num
    },
    async checkAddress() {
      const zipCode = this.entrepreneur.address.zipCode
      const houseNumber = this.entrepreneur.address.houseNumber

      if (!zipCode || !houseNumber) {
        return
      }

      this.errors = []
      this.isAddressChecked = true

      try {
        const res = await API.get(
          'BackendAPIDev',
          `/address/${zipCode}/${houseNumber}`,
          {}
        )
        this.entrepreneur.city = res.city
        this.entrepreneur.streetName = res.street
        this.entrepreneur.longitude = res.longitude
        this.entrepreneur.latitude = res.latitude
      } catch (e) {
        this.errors.push(ErrorType.CANT_FETCH_ADDRESS)
        console.error(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';
.company-details__buttons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
