<template>
  <div>
    <div ref="googleMap" class="google-map"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: 'LetMeHelp',
  components: {},
  data: () => {
    return {
      google: null,
      map: null,
      mapConfig: {
        // Amsterdam central station
        center: { lat: 52.379189, lng: 4.899431 },
        zoom: 13,
        disableDefaultUI: true,
      },
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
      language: 'nl',
    })
    this.google = googleMapApi
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
      this.navigateMapToTheCurrentLocation()
    },
    navigateMapToTheCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          this.map.setCenter(pos)
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

$size-distance-from-margin: 2rem;
.google-map {
  width: 100%;
  // TODO review markup with https://github.com/I-OWE-YOU/web-frontend/issues/78
  height: calc(100vh - #{$size-header-height + $size-distance-from-margin});
  margin-top: $size-distance-from-margin;
}
</style>
