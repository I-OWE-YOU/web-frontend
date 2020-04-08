<template>
  <div id="app" class="d-flex flex-column">
    <Header />
    <RouterView :key="$route.fullPath" class="mx-3 flex-fill" />
    <Footer />
  </div>
</template>

<script>
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
export default {
  name: 'App',
  components: { Header, Footer },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Design variables and utilities from src/design.
@import '@design';

html {
  font-size: 16px;
}

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
