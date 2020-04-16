<template>
  <form class="input-group flex-column align-items-center flex-fill">
    <h2>Jouw bedrijfs gegevens</h2>

    <FormField
      v-model="entrepreneur.address.zipCode"
      field-name="zipCode"
      placeholder="Postcode van je bedrijf"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.address.houseNumber"
      field-name="houseNumber"
      placeholder="Huis nummer"
      :required="true"
    />

    <div v-if="errors.length" class="text-danger pb-2">
      <template v-if="errors.includes(ErrorType.MANDATORY)"
        >Vergeet niet je adres in te vullen.</template
      >
      <template v-if="errors.includes(ErrorType.ZIP_CODE_INVALID)"
        >Vul even een geldige postcode in.</template
      >
      <template v-if="errors.includes(ErrorType.HOUSE_NUMBER_INVALID)"
        >Welk huisnummer hoort bij je adres?</template
      >
      <template v-if="errors.includes(ErrorType.CANT_FETCH_ADDRESS)"
        >Dit adres lijkt niet te bestaan. Probeer het nog eens.</template
      >
    </div>
    <div v-else-if="isAddressChecked" class="pb-2">
      <p>
        {{ entrepreneur.address.street }}
        {{ entrepreneur.address.houseNumber }}
      </p>
      <p>{{ entrepreneur.address.city }} {{ entrepreneur.address.zipCode }}</p>
    </div>

    <div class="flex-fill"></div>

    <button
      class="btn btn-red big-red-button"
      type="button"
      @click="checkAddress"
      >Adres controleren</button
    >

    <button
      class="btn btn-red big-red-button mt-3"
      :disabled="!isAddressChecked || errors.length !== 0"
      type="button"
      @click="saveDataAndNavigate"
      >Volgende</button
    >
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
      return !!num && num.length < 10
    },
    async checkAddress() {
      this.errors = []
      this.isAddressChecked = false

      const zipCode = this.entrepreneur.address.zipCode
      const houseNumber = this.entrepreneur.address.houseNumber

      if (!zipCode || !houseNumber) {
        this.errors.push(ErrorType.MANDATORY)
        return
      }

      if (!this.isValidZipCode(zipCode)) {
        this.errors.push(ErrorType.ZIP_CODE_INVALID)
        return
      }

      if (!this.isValidHouseNumber(houseNumber)) {
        this.errors.push(ErrorType.HOUSE_NUMBER_INVALID)
        return
      }

      try {
        const res = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/address/${zipCode}/${houseNumber}`
        )
        this.isAddressChecked = true
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
