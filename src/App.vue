<template>
  <div id="app">
    <router-link to="/">
      <logoT />
    </router-link>
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import logoT from '@components/logoT.vue'

export default {
  name: 'App',
  components: { logoT },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  @include font-size($size-content-font);

  font-weight: 600;
  background-color: $color-blue-light;
}

#app {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  color: $color-text;
  text-align: center;
  background: $color-body-bg;
  background-color: $color-blue-dark;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ===
// Base element styles
// ===

a,
a:visited {
  color: $color-link-text;
}

h1 {
  @extend %typography-xxlarge;
  @include font-size($size-content-font-xl);

  line-height: 1.1;
  color: white;
}

h2 {
  @extend %typography-xlarge;
  @include font-size($size-content-font-l);

  color: white;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

p {
  @include font-size($size-content-font);
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>
