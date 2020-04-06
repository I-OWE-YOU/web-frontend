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
        {{ entrepreneur.address.street }}
        {{ entrepreneur.address.houseNumber }}
      </p>
      <p>{{ entrepreneur.address.city }} {{ entrepreneur.address.zipCode }}</p>
    </div>
    <div
      v-if="isAddressChecked && errors.includes(ErrorType.CANT_FETCH_ADDRESS)"
      class="pt-5"
    >
      <p class="text-danger">We can't fetch this address. Please try again</p>
    </div>

    <div class="company-details__buttons">
      <button class="big-red-button" type="button" @click="checkAddress"
        >Adres controleren</button
      >
      <button
        class="big-red-button"
        :disabled="!isAddressChecked || errors.length !== 0"
        type="button"
        @click="saveDataAndNavigate"
        >Volgende</button
      >
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { EventBus } from '@plugins/event-bus.js'
import FormField from '@components/FormField.vue'
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
    async saveDataAndNavigate() {
      try {
        await axios.put(
          `${process.env.VUE_APP_BACKEND_URL}/company/${(
            await Auth.currentAuthenticatedUser()
          ).getUsername()}`,
          { ...this.entrepreneur },
          {
            headers: {
              Authorization: (await Auth.currentSession())
                .getIdToken()
                .getJwtToken(),
            },
          }
        )
        EventBus.$emit('EntrepreneurFlow.next')
      } catch (e) {
        console.error(e)
      }
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
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/address/${zipCode}/${houseNumber}`
        )
        const { city, street, longitude, latitude } = res.data

        this.entrepreneur.address.city = city
        this.entrepreneur.address.street = street
        this.entrepreneur.address.longitude = longitude
        this.entrepreneur.address.latitude = latitude
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
