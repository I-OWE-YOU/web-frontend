<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

body {
  background-color: white;
  color: white;
  font-weight: 600;
}

#app {
  background-color: $color_blue_dark;
  font-family: "Work Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 768px;
  position: relative;
  margin: 0 auto;
}
</style>
