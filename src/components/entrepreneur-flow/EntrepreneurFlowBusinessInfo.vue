<template>
  <form>
    <h1>Wat zijn jouw bedrijfsgegevens?</h1>

    <FormField
      v-model="entrepreneur.companyName"
      field-name="companyName"
      field-label="Bedrijfsnaam"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.cocNumber"
      field-name="cocNumber"
      field-label="KvK-nummer"
      inputmode="numeric"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.address.houseNumber"
      field-name="houseNumber"
      field-label="Huis nummer"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.address.zipCode"
      field-name="zipCode"
      field-label="Postcode van je bedrijf"
      :required="true"
    />

    <button :disabled="isFormInvalid" type="button" @click="emitFlowNavigate"
      >Volgende</button
    >
  </form>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import FormField from '@components/FormField.vue'

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
  computed: {
    isFormInvalid: function() {
      return (
        !this.isValidCompanyName(this.entrepreneur.companyName) ||
        !this.isValidCocNumber(this.entrepreneur.cocNumber) ||
        !this.isValidZipCode(this.entrepreneur.address.zipCode) ||
        !this.isValidHouseNumber(this.entrepreneur.address.houseNumber)
      )
    },
  },
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
    // TODO max and min length validation?
    isValidCompanyName(s) {
      return !!s
    },
    isValidCocNumber(s) {
      return s && s.length === 8 && /^[1-9][0-9]{7}$/i.test(s)
    },
    isValidZipCode(z) {
      const ze = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
      return ze.test(z)
    },
    isValidHouseNumber(num) {
      return !!num
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';
</style>
