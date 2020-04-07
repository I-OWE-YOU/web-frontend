<template>
  <form>
    <h1>Wat is je naam?</h1>

    <FormField
      v-model="entrepreneur.contactFirstName"
      field-name="firstName"
      field-label="Voornaam"
      :required="true"
    />

    <FormField
      v-model="entrepreneur.contactInsertion"
      field-name="insertion"
      field-label="Tussenvoegsel"
    />

    <FormField
      v-model="entrepreneur.contactLastName"
      field-name="lastName"
      field-label="Achternaam"
    />

    <button
      class="big-red-button"
      :disabled="isFormInvalid"
      type="button"
      @click="emitFlowNavigate"
      >Volgende</button
    >
  </form>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'
import FormField from '@components/FormField.vue'

export default {
  name: 'EntrepreneurFlowPersonName',
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
        !this.isNameValid(this.entrepreneur.contactFirstName) ||
        !this.isNameValid(this.entrepreneur.contactLastName)
      )
    },
  },
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
    isNameValid(name) {
      return name && name.length > 2 && name.length < 200
    },
  },
}
</script>
