<template>
  <header>
    <Nav />
    <router-link to="/">
      <logoT class="py-4" />
    </router-link>
  </header>
</template>

<script>
import Nav from '@components/Nav.vue'
import logoT from '@components/logoT.vue'

export default {
  name: 'Header',
  components: { Nav, logoT },
}
</script>

<style scoped lang="scss">
@import '@design';

header {
  height: $size-header-height;
}
</style>
