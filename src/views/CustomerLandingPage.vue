<template>
  <div class="d-flex flex-column align-items-center">
    <h2>Een ondernemer uit de buurt steunen</h2>
    <p
      >En draag je een steuntje bij voor de kleinste bedrijven in jou buurt in
      deze moeilijke tijden. Het werkt zo:</p
    >
    <ul class="p-0 mt-4 customer__list">
      <li class="py-2 d-flex">
        <span class="px-3">
          <svg
            class="customer__icon"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.69565 18.3913C14.4981 18.3913 18.3913 14.4981 18.3913 9.69565C18.3913 4.89318 14.4981 1 9.69565 1C4.89318 1 1 4.89318 1 9.69565C1 14.4981 4.89318 18.3913 9.69565 18.3913Z"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            <path
              d="M16.2173 16.2173L25.9999 25.9999"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </span>

        <span
          >In deze moeilijke tijden kun je helpen de lasten te verlichten van
          jouw favoriete lokale ondernemers.</span
        >
      </li>

      <li class="py-2 d-flex">
        <span class="px-3">
          <svg
            class="customer__icon"
            viewBox="0 0 35 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 5.19995H1V22H29V5.19995Z"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            <path
              d="M5.19995 5.2V1H33.2V17.8H29"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            <path
              d="M15 17.7999C17.3196 17.7999 19.2 15.9195 19.2 13.5999C19.2 11.2803 17.3196 9.3999 15 9.3999C12.6805 9.3999 10.8 11.2803 10.8 13.5999C10.8 15.9195 12.6805 17.7999 15 17.7999Z"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </span>

        <span>Kies een bedrag waarmee jij die ondernemen wil steunen.</span>
      </li>

      <li class="py-2 d-flex">
        <span class="px-3">
          <svg
            class="customer__icon"
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H27V15.6957C27 18.1826 24.9652 20.2174 22.4783 20.2174H5.52174C3.03478 20.2174 1 18.1826 1 15.6957V1Z"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            <path
              d="M3.99561 4.33472L14 13.4347L24.0608 4.33472"
              stroke="#FB6B87"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </span>
        <span
          >Zodra het bedrag is betaald, ontvang je een e-mail met QR code. Die
          kan je vervolgens verzilveren als de zaken weer gaan lopen.</span
        >
      </li>
    </ul>

    <ButtonLink :link="routes.letMeHelp" linktext="Ok, laten we beginnen" />
  </div>
</template>

<script>
import ButtonLink from '@components/ButtonLink.vue'

import { routes } from '@router/routes'

export default {
  name: 'CustomerLandingPage',
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
.customer {
  &__icon {
    width: 1.5em;
    height: 1.5em;
  }
  &__list {
    list-style-type: none;
  }
}
</style>
