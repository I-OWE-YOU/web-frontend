<template>
  <footer>
    <div class="footter__circles--top"></div>
    <div class="footter__circles--bottom w-100"></div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
@import '@design';

.footter__circles {
  &--top {
    width: calc(100% - #{2 * $footer-header-decor-circle-x-intent});
    height: $footer-header-decor-circle-size;
    margin-right: $footer-header-decor-circle-x-intent;
    margin-left: $footer-header-decor-circle-x-intent;
    background: radial-gradient(
      ellipse at center,
      $footer-circles-color 0%,
      $footer-circles-color 50%,
      transparent 30%
    );
    background-repeat: repeat-x;
    background-size: $footer-header-decor-circle-size
      $footer-header-decor-circle-size;
  }
  &--bottom {
    height: $footer-header-decor-circle-size;
    margin-top: $footer-header-decor-circle-size / -2;
    background: $footer-circles-color;
  }
}
</style>
