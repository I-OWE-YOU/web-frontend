<template>
  <header>
    <Nav />
    <router-link to="/">
      <logoT class="my-4" />
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
