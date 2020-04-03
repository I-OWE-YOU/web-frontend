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
    <div v-if="isAddressChecked" class="pt-5">
      <p
        >{{ this.entrepreneur.streetName }}
        {{ this.entrepreneur.address.houseNumber }}</p
      >
      <p
        >{{ this.entrepreneur.city }} {{ this.entrepreneur.address.zipCode }}</p
      >
    </div>

    <div class="company-details__buttons">
      <button class="big-red-button" type="button" @click="checkAddress"
        >Adres controleren</button
      >

      <button
        class="big-red-button"
        :disabled="!isAddressChecked"
        type="button"
        @click="emitFlowNavigate"
        >Volgende</button
      >
    </div>
  </form>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import FormField from '@components/FormField.vue'
import { API } from 'aws-amplify'

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
}
</style>
