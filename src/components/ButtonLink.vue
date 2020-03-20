<template>
  <div class="buttonlink">
    <router-link class="buttonlink" :to="link">{{ linktext }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    link: String,
    linktext: String,
  },
}
</script>

<style scoped lang="scss">
.buttonlink {
  padding: 0 0 24px;
  background-color: $color_blue_darker;

  a {
    @include buttonstyle();
  }
}
</style>
