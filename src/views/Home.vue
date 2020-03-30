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
      text="zetten wij jou op de kaart"
      aligndigit="left"
    />
    <ButtonLink
      :link="routes.letMeHelp"
      class="start_btn"
      linktext="Steun een ondernemer"
    />
    <ButtonLink
      :link="routes.signup"
      class="start_btn"
      linktext="Schrijf je in als ondernemer"
    />
  </div>
</template>

<script>
import TwoLadies from '@components/TwoLadies.vue'
import NumberedInfo from '@components/NumberedInfo.vue'
import ButtonLink from '@components/ButtonLink.vue'

import { routes } from '@router/routes'

export default {
  name: 'Home',
  components: {
    TwoLadies,
    NumberedInfo,
    ButtonLink,
  },
  data: () => {
    return {
      routes,
    }
  },
}
</script>

<style lang="scss">
#app > div > div.buttonlink.start_btn {
  padding-bottom: 6em;

  > a {
    padding: 0.75em 1em !important;
  }
}
</style>
