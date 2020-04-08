<template>
  <div class="d-flex flex-column align-items-center">
    <h2 class="py-4">Verlicht de lasten van ondernemers</h2>

    <main class="pl-3">
      <div class="text-center">
        <div class="video position-relative" @click="playVideo">
          <svg
            v-if="!isPlaying"
            class="video__play-icon position-absolute"
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <path
                d="M47.9754 32.3726C49.3152 33.1411 49.3152 35.0738 47.9754 35.8423L27.6562 47.497C26.3229 48.2618 24.6611 47.2992 24.6611 45.7621L24.6611 22.4528C24.6611 20.9157 26.3229 19.9532 27.6562 20.7179L47.9754 32.3726Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0.661133"
                y="0.449951"
                width="72.3192"
                height="75.3153"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="12" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <video
            ref="videoEL"
            class="w-100"
            @play="setIsPlaying(true)"
            @pause="setIsPlaying(false)"
          >
            <source src="../assets/intro.mp4" type="video/mp4" />Your browser
            does not support the video tag.
          </video>
        </div>
        <h6 class="text-danger m-1">bekijk de video</h6>
      </div>
      <ul class="p-0">
        <li class="py-4 d-flex">
          <span class="pr-3">
            <svg
              width="40"
              height="38"
              viewBox="0 0 24 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.9856 0.8125L14.4135 16.2451H24L7.01445 37.7005L9.58654 22.2679H0L16.9856 0.8125ZM3.26554 20.6882H11.4514L9.58039 31.9142L20.7345 17.8248H12.5486L14.4196 6.59882L3.26554 20.6882Z"
                fill="#FB6B87"
              />
            </svg>
          </span>
          <span class="text-left">
            Het Coronavirus heeft een grote impact op kleine ondernemers. Velen
            zijn nu dicht en kunnen hun producten of diensten niet aanbieden.
            Maar de vaste lasten lopen gewoon door.
          </span>
        </li>
        <li class="pb-4 d-flex">
          <span class="pr-3">
            <svg
              width="40"
              height="35"
              viewBox="0 0 37 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.753418 19.3062L23.4315 0.276959L27.7034 5.36796L27.0092 5.95049C26.334 6.51697 25.9116 7.32844 25.8348 8.20638C25.758 9.08432 26.0331 9.95681 26.5996 10.6319C27.1661 11.307 27.9775 11.7295 28.8555 11.8063C29.7334 11.8831 30.6059 11.608 31.281 11.0415L31.9752 10.459L36.2471 15.55L13.569 34.5792L9.29714 29.4882L9.99136 28.9056C10.6665 28.3391 11.0889 27.5277 11.1657 26.6497C11.2425 25.7718 10.9674 24.8993 10.4009 24.2242C9.83445 23.5491 9.02299 23.1267 8.14505 23.0499C7.26711 22.9731 6.39461 23.2481 5.7195 23.8146L5.02528 24.3972L0.753418 19.3062ZM3.30693 19.5296L5.30047 21.9054C6.20409 21.3871 7.25102 21.1522 8.30302 21.2443C9.65983 21.363 10.9139 22.0158 11.7894 23.0591C12.6649 24.1025 13.09 25.4509 12.9713 26.8077C12.8793 27.8597 12.4661 28.8499 11.7989 29.6498L13.7924 32.0257L33.6936 15.3266L31.7001 12.9508C30.7964 13.469 29.7495 13.7039 28.6975 13.6119C27.3407 13.4932 26.0866 12.8403 25.2111 11.797C24.3357 10.7536 23.9105 9.40523 24.0292 8.04841C24.1213 6.99642 24.5344 6.00618 25.2017 5.20628L23.2081 2.83047L3.30693 19.5296ZM11.1164 18.4974L20.8356 10.3421L25.8841 16.3587L16.1649 24.5141L11.1164 18.4974ZM13.6699 18.7208L16.3883 21.9606L23.3306 16.1353L20.6122 12.8956L13.6699 18.7208Z"
                fill="#FB6B87"
              />
            </svg>
          </span>
          <span class="text-left">
            Via Tegoedje.nu help je mee die lasten te verlichten door een
            tegoedbon te kopen van jouw favoriete lokale ondernemers. Die kan je
            dan verzilveren zodra de zaken dan weer gaan lopen.
          </span>
        </li>
      </ul>
    </main>

    <ButtonLink
      :link="routes.customer"
      class="btn btn-red big-red-button mb-4"
      linktext="Steun een ondernemer"
    />
    <ButtonLink
      :link="routes.signup"
      class="btn btn-red big-red-button mb-4"
      linktext="Schrijf je in als ondernemer"
    />
  </div>
</template>

<script>
import ButtonLink from '@components/ButtonLink.vue'

import { routes } from '@router/routes'

export default {
  name: 'Home',
  components: {
    ButtonLink,
  },
  data: () => {
    return {
      isPlaying: false,
      routes,
    }
  },
  methods: {
    setIsPlaying(value) {
      this.isPlaying = value
    },
    playVideo() {
      if (this.isPlaying) {
        return
      }
      /** @type {HTMLVideoElement}  */
      const elem = this.$refs.videoEL
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen()
      }
      elem.play()
      // to give user chance to manage video playback after get back from fullscreen mode
      elem.controls = true
    },
  },
}
</script>

<style lang="scss">
$play-button-size: 4.5rem;
.video {
  cursor: pointer;
  &__play-icon {
    top: 50%;
    left: 50%;
    z-index: 2;
    width: $play-button-size;
    height: $play-button-size;
    margin-top: $play-button-size / -2;
    margin-left: $play-button-size / -2;
  }
}
</style>
