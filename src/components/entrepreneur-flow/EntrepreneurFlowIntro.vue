<template>
  <div class="d-flex flex-column align-items-center flex-fill">
    <h2>Gelukt!</h2>

    <p>
      Je e-mail staat bij ons genoteerd. Vul de rest van je gegevens in om je
      Tegoedjes te kunnen ontvangen.
    </p>

    <div class="flex-fill"></div>
    <button
      class="btn btn-red big-red-button"
      type="button"
      @click="emitFlowNavigate"
      >Ok</button
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
