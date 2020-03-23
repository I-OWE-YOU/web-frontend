<template>
  <div class="buttonlink">
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
.buttonlink {
  padding: 0 0 $size-button-padding-vertical;
  background-color: $color-blue-darker;

  a {
    @include buttonstyle();
  }
}
</style>
