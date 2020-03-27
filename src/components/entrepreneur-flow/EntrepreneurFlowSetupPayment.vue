<template>
  <div>
    <h1>Voeg een betaalmethode toe</h1>

    <p
      >Op het mogelijk te maken om een Tegoedje te kunnen afnemen van jou moet
      er een betaalmethode worden geactiveerd</p
    >

    <button type="button" @click="emitFlowNavigate"
      >Selecteer betaalmethode</button
    >
  </div>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'EntrepreneurFlowSetupPayment',
  methods: {
    emitFlowNavigate: () => {
      EventBus.$emit('EntrepreneurFlow.next')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';
</style>
