<template>
  <div class="btn btn-red btn-link big-red-button">
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
