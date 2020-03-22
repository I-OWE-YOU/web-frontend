<template>
  <div class="home">
    <TwoLadies />
    <NumberedInfo
      digit="1"
      color="light"
      title="Begin"
      text="en meld je aan met je shop"
      aligndigit="left"
    />
    <NumberedInfo
      digit="2"
      color="medium"
      title="Daarna"
      text="maak jij je vouchers aan"
      aligndigit="right"
    />
    <NumberedInfo
      digit="3"
      color="dark"
      title="Tenslotte"
      text="zetten wij jou op de map"
      aligndigit="left"
    />
    <ButtonLink
      link="/voor-de-ondernemer"
      class="start_btn"
      linktext="Ja, dit wil ik ook"
    />
  </div>
</template>

<script>
import TwoLadies from '@components/TwoLadies.vue'
import NumberedInfo from '@components/NumberedInfo.vue'
import ButtonLink from '@components/ButtonLink.vue'

export default {
  name: 'Home',
  components: {
    TwoLadies,
    NumberedInfo,
    ButtonLink,
  },
}
</script>

<style lang="scss">
#app > div > div.buttonlink.start_btn > a {
  padding: 0.75em 1em !important;
}
</style>
