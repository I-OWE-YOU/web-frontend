<template>
  <header class="text-center header">
    <Nav />
    <router-link to="/">
      <LogoTegoedje
        v-if="currentRoutePath === routes.home"
        class="py-2 header__logo-margin"
      />
      <logoT v-else class="py-2 header__logo-margin" />
    </router-link>
  </header>
</template>

<script>
import Nav from '@components/Nav.vue'
import logoT from '@components/logoT.vue'
import LogoTegoedje from '@components/LogoTegoedje.vue'
import { routes } from '@router/routes'

export default {
  name: 'Header',
  components: { Nav, logoT, LogoTegoedje },
  data() {
    return {
      routes: routes,
    }
  },
  computed: {
    currentRoutePath() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss">
@import '../design/sizes';

.header {
  height: $size-header-height + $size-logo-margin;

  &__logo-margin {
    margin-top: $size-logo-margin;
  }
}
</style>
