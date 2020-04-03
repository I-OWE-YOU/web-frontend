<template>
  <div>
    <form @submit.prevent="navigateToAddress">
      <FormField
        v-model="search"
        field-name="search"
        field-label="Zoek via postcode of plaatsnaam"
        :required="true"
      />
    </form>

    <div
      ref="googleMap"
      class="google-map"
      :class="{ 'google-map--short': !!selectedCompany }"
    ></div>

    <div v-if="selectedCompany" ref="markerInfo" class="text-left pl-4 pt-5">
      <h2 v-text="selectedCompany.companyName"></h2>
      <div>
        <p>
          {{ selectedCompany.contactLastName }}
          {{ selectedCompany.contactFirstName }}
        </p>
        <p>{{ selectedCompany.street }} {{ selectedCompany.houseNumber }}</p>
        <p>{{ selectedCompany.zipCode }} {{ selectedCompany.city }}</p>
      </div>

      <ButtonLink
        :link="routes.coupons + '/' + selectedCompany.companyId"
        linktext="Kies deze ondernemer"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleMapsApiLoader from 'google-maps-api-loader'

import { routes } from '@router/routes'
import FormField from '@components/FormField.vue'
import ButtonLink from '@components/ButtonLink.vue'
// eslint-disable-next-line import/no-relative-parent-imports
import { companies } from '../test-data/companies'

// eslint-disable-next-line import/no-relative-parent-imports, no-unused-vars
import typings from '../typings/company'

export default {
  name: 'LetMeHelp',
  components: {
    FormField,
    ButtonLink,
  },
  data: () => {
    return {
      google: null,
      map: null,
      /** @type {typings.CompanyFlatten} */
      selectedCompany: null,
      search: '',
      routes: routes,
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
    this.geocoder = new window.google.maps.Geocoder()
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
      this.map.addListener('click', () => (this.selectedCompany = null))
      this.navigateMapToTheCurrentLocation()

      this.loadCompanies()
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
    navigateToAddress() {
      const request = { address: this.search, location: this.map.getCenter() }
      this.geocoder.geocode(request, (results, status) => {
        if (status === 'OK') {
          this.map.setCenter(results[0].geometry.location)
        } else {
          alert('Address was not found for the following reason: ' + status)
        }
      })
    },
    loadCompanies() {
      companies.forEach((c) => this.placeCompanyMarker(c))
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/companies`)
        .then((response) => {
          /** @type {Array<typings.CompanyFlatten>} */
          const companies = response.data
          companies.forEach((c) => this.placeCompanyMarker(c))
        })
        .catch((e) => {
          const message = e.reponse ? e.response.data : e.message
          alert(
            `Er is iets misgegaan bij het opslaan van je gegevens: '${message}'`
          )
        })
    },
    placeCompanyMarker(company) {
      if (!this.isValidCompany(company)) {
        return
      }
      const marker = new this.google.maps.Marker({
        // label: `${company.contactLastName} ${company.contactFirstName}`,
        map: this.map,
        position: {
          lat: Number(company.latitude),
          lng: Number(company.longitude),
        },
      })
      marker.addListener('click', () => (this.selectedCompany = company))
    },
    isValidCompany(company) {
      const requiredFields = [
        'latitude',
        'longitude',
        'companyName',
        'companyId',
      ]
      if (requiredFields.some((field) => !company[field])) {
        console.warn(
          'Marker for the company was not placed due to incomplete data',
          company
        )
        return false
      }
      if (isNaN(Number(company.latitude))) {
        console.warn(
          'Marker for the company was not placed due to incorrecct latitude',
          company
        )
        return false
      }
      if (isNaN(Number(company.longitude))) {
        console.warn(
          'Marker for the company was not placed due to incorrecct longitude',
          company
        )
        return false
      }
      return true
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
  height: calc(
    100vh - #{$size-header-height + $size-distance-from-margin +
      $size-logo-margin}
  );
  margin-top: $size-distance-from-margin;

  &--short {
    height: 18rem;
  }
}
</style>
