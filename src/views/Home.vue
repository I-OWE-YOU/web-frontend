<template>
  <div class="home">
    <h1>Verlicht de lasten van ondernemers</h1>
    <VideoSvg />
    <p class="text-danger m-1">bekijk de video</p>
    <ul class="p-0 m-4">
      <li class="py-4 d-flex">
        <span class="px-3">
          <b-icon-search variant="danger" font-scale="3" class="pr-4"></b-icon-search>
        </span>
        <span class="text-left">
          Het Coronavirus heeft een grote impact op kleine ondernemers. Velen
          zijn nu dicht en kunnen hun producten of diensten niet aanbieden. Maar
          de vaste lasten lopen gewoon door.
        </span>
      </li>
      <li class="py-4 d-flex">
        <span class="px-3">
          <b-icon-tag variant="danger" font-scale="3" class="pr-4"></b-icon-tag>
        </span>
        <span class="text-left">
          Via Tegoedje.nu help je mee die lasten te verlichten door een
          tegoedbon te kopen van jouw favoriete lokale ondernemers. Die kan je
          dan verzilveren zodra de zaken dan weer gaan lopen.
        </span>
      </li>
    </ul>
    <ButtonLink
      :link="routes.customer"
      class="big-red-button mb-5"
      linktext="Steun een ondernemer"
    />
    <ButtonLink
      :link="routes.signup"
      class="big-red-button mb-5"
      linktext="Schrijf je in als ondernemer"
    />
  </div>
</template>

<script>
import ButtonLink from '@components/ButtonLink.vue'
import VideoSvg from '@components/VideoSvg.vue'

import { routes } from '@router/routes'

export default {
  name: 'Home',
  components: {
    ButtonLink,
    VideoSvg,
  },
  data: () => {
    return {
      routes,
    }
  },
}
</script>
