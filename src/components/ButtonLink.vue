<template>
  <div class="buttonlink">
    <router-link :to="link">{{ linktext }}</router-link>
  </div>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    link: String,
    linktext: String
  }
};
</script>

<style scoped lang="scss">
.buttonlink {
  background-color: $color_blue_darker;
  padding: 0 0 24px;

  a {
    background-color: $color_accent;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    min-width: 232px;
    display: inline-block;
  }
}
</style>
