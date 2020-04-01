<template>
  <div class="buttonlink big-red-button">
    <router-link :to="link">{{ linktext }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    link: {
      type: String,
      default: '',
    },
    linktext: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';
</style>
