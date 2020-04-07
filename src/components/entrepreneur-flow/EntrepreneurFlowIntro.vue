<template>
  <div>
    <h1>Gelukt!</h1>

    <p>
      Je e-mail staat bij ons genoteerd. Vul de rest van je gegevens in om je
      Tegoedjes te kunnen ontvangen.
    </p>

    <button class="big-red-button" type="button" @click="emitFlowNavigate"
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
