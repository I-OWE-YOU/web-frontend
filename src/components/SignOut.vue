<template>
  <span @click="signOut">{{ description }}</span>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { AuthStateValue } from '@views/constants'

export default {
  name: 'SignOut',
  props: {
    description: {
      type: String,
      default: 'Uitloggen',
    },
  },
  methods: {
    async signOut() {
      await Auth.signOut()
      AmplifyEventBus.$emit('authState', AuthStateValue.SIGNED_OUT)
    },
  },
}
</script>
