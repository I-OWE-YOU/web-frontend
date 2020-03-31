<template>
  <div class="p-5 text-left">
    <h1>Zo steun je een ondernemer</h1>
    <h3 class="p-2 text-white"
      >En draag je een steuntje bij voor de kleinste bedrijven in jou buurt in
      deze moeilijke tijden. Het werkt zo:</h3
    >
    <ul class="p-0 mt-4">
      <li class="py-2 d-flex">
        <span class="px-3">$ICON</span>

        <span
          >Zoek de ondernemen in jou buurt door midden van het zoeken op naam of
          poscode.</span
        >
      </li>

      <li class="py-2 d-flex">
        <span class="px-3">$ICON</span>

        <span
          >Kies een bedrag waarmee jij die ondernemen wil steunen. We hebben een
          voorselectie gemaakt maar je mag het ook helemaal zelf bepalen.</span
        >
      </li>

      <li class="py-2 d-flex">
        <span class="px-3">$ICON</span>
        <span
          >Als je het bedrag betaald hebt stuurd de ondernemen jou een email met
          het Tegoedje inclusief QR code.</span
        >
      </li>
    </ul>

    <ButtonLink
      :link="routes.letMeHelp"
      class="text-center mt-5"
      linktext="Ok, laten we beginnen"
    />
  </div>
</template>

<script>
import ButtonLink from '@components/ButtonLink.vue'

import { routes } from '@router/routes'

export default {
  name: 'ClientLandingPage',
  components: {
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
@import '@design';

ul {
  list-style-type: none;
}
</style>
