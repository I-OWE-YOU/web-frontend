<template>
  <div>
    <h1>Alles is geregeld</h1>

    <p>Vanaf nu kan je aan de slag en officieel je Tegoedjes delen</p>

    <button class="big-red-button" type="button" @click="emitFlowNavigate"
      >Share jouw Tegoedjes</button
    >
  </div>
</template>

<script>
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'EntrepreneurFlowFinish',
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
