<template>
  <div id="questions">
    <img
      id="backbtn"
      alt="back to homepage"
      src="../assets/img/backbtn.svg"
      @click="goBack"
    />

    <img
      v-if="errorState"
      id="tegoedje"
      alt
      role="presentation"
      src="../assets/img/bijnagoed.svg"
    />
    <img
      v-else
      id="tegoedje"
      alt
      role="presentation"
      src="../assets/img/tegoedje.svg"
    />

    <h1 v-text="questionText" />

    <p v-show="errorState" class="error">
      {{ errorMessage }}
    </p>

    <p v-show="accountCreated" class="success">
      Je aanmelding is compleet!
    </p>

    <form action="#">
      <FormField
        v-if="step === 1"
        field-name="companyName"
        :field-value="customer.companyName"
        field-label="Bedrijfsnaam"
        @update:companyName="customer.companyName = $event"
        @change:companyName="errorState = false"
      />

      <FormField
        v-if="step === 2"
        field-name="cocNumber"
        :field-value="customer.cocNumber"
        field-label="KvK nummer"
        @update:cocNumber="customer.cocNumber = $event"
        @change:cocNumber="errorState = false"
      />

      <FormField
        v-if="step === 3"
        field-name="firstName"
        :field-value="customer.contactFirstName"
        field-label="Voornaam"
        @update:firstName="customer.firstName = $event"
        @change:firstName="errorState = false"
      />

      <FormField
        v-if="step === 3"
        field-name="lastName"
        :field-value="customer.contactLastName"
        field-label="Achternaam"
        @update:lastName="customer.lastName = $event"
        @change:lastName="errorState = false"
      />

      <FormField
        v-if="step === 4"
        field-name="zipCode"
        :field-value="zipCode"
        field-label="Postcode"
        @update:postalCode="customer.postalCode = $event"
        @change:postalCode="
          errorState = false
          resetAddress
        "
      />

      <FormField
        v-if="step === 4"
        field-name="houseNumber"
        :field-value="houseNumber"
        field-label="Huisnummer"
        @update:streetNumber="customer.streetNumber = $event"
        @change:streetNumber="
          errorState = false
          resetAddress
        "
      />

      <div v-show="addressLoaded" id="address">
        <p>
          We hebben je adres gevonden. Klopt dit niet? Pas dan hierboven je
          postcode en huisnummer aan.
        </p>
        <br />
        {{ customer.streetName }}&nbsp;{{ customer.streetNumber }}
        <br />
        {{ customer.postalCode }}&nbsp;{{ customer.city }}
      </div>

      <FormField
        v-if="step === 5"
        field-name="email"
        :field-value="customer.email"
        field-label="E-mail"
        description="don't worry, we spammen je niet"
        @update:email="customer.email = $event"
        @change:email="errorState = false"
      />

      <FormField
        v-if="step === 6"
        field-name="IBAN"
        :field-value="customer.iban"
        field-label="IBAN nummer"
        @update:IBAN="customer.IBAN = $event"
        @change:IBAN="errorState = false"
      />

      <div v-if="step === 6">
        <p>checkbox here to accept terms</p>
      </div>

      <button @click.prevent="buttonClicked">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import IBAN from 'iban'
import FormField from '@components/FormField.vue'

export default {
  name: 'Entrepreneur',
  components: {
    FormField,
  },
  data: function() {
    return {
      step: 0,
      maxSteps: 6,
      addressLoaded: false,
      accountCreated: false,
      errorState: false,
      errorMessage: '',
      texts: [
        'Geweldig!<br />Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen.',
        'Om te beginnen: hoe heet je bedrijf?',
        'Goede naam! We willen graag weten wat je Kamer van Koophandel nummer is, om misbruik tegen te gaan.',
        'Hoe heet je?',
        'Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?',
        'Bijna klaar. Hoe kunnen we je bereiken?',
        'En tot slot, waar mag het geld naartoe FIRSTNAME?',
        '',
      ],
      customer: {
        companyName: '',
        cocNumber: '',
        firstName: '',
        lastName: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        longitude: 0.0,
        latitude: 0.0,
        email: '',
        IBAN: '',
      },
    }
  },
  computed: {
    buttonText: function() {
      if (this.addressLoaded) {
        return 'Ja! Dit adres klopt.'
      } else if (this.step === 0) {
        return 'Ga verder'
      } else if (this.step === 4) {
        return 'Check postcode'
      } else if (this.maxSteps === this.step) {
        return 'Afronden'
      } else {
        return 'Volgende'
      }
    },
    questionText: function() {
      var text = this.texts[this.step]
      return text.replace('FIRSTNAME', this.customer.firstName)
    },
  },
  methods: {
    goBack() {
      if (this.step === 0) {
        this.$router.go(-1)
      } else {
        this.step--
      }
    },
    buttonClicked() {
      if (this.accountCreated) {
        // goto result page
      }
      if (this.step === this.maxSteps) {
        this.removeError()
        // Call API to process data
        this.postData()
        return
      }

      if (this.checkInput()) {
        this.removeError()
        this.step += 1
      }
    },
    checkInput() {
      switch (this.step) {
        case 0:
          return true
        case 1:
          if (this.isStringEmpty(this.customer.companyName)) {
            this.showError('Wil je je bedrijfsnaam alsjeblieft invullen?')
            return false
          }
          return true
        case 2:
          if (!this.isValidCocNumber(this.customer.cocNumber)) {
            this.showError('Wil je een geldig KvK nummer invullen?')
            return false
          }
          return true
        case 3:
          if (
            this.isStringEmpty(this.customer.contactFirstName) ||
            this.isStringEmpty(this.customer.contactLastName)
          ) {
            this.showError('We willen graag weten hoe je heet! Ah toe?')
            return false
          }
          return true
        case 4:
          if (
            this.isStringEmpty(this.zipCode) ||
            this.isStringEmpty(this.houseNumber)
          ) {
            this.showError(
              'Met je postcode en huisnummer zoeken we je locatie op.'
            )
            return false
          }
          if (this.addressLoaded) {
            this.addressLoaded = false
            return true
          }
          this.loadAddress()
          return false
        case 5:
          if (!this.isValidEmail(this.customer.email)) {
            this.showError(
              'Dit e-mail adres ziet er onbruikbaar uit. Wil je het checken?'
            )
            return false
          }
          return true
        case 6:
          if (!IBAN.isValid(this.customer.iban)) {
            this.showError(
              'Dit IBAN nummer is niet geldig. Sorry dat we even streng zijn, we willen graag dat je je geld krijgt.'
            )
            return false
          }
          return true
      }
    },
    postData() {
      axios
        .post('https://tegoedje-api.azurewebsites.net/api/companies', {
          body: this.customer,
        })
        .then((response) => {
          this.accountCreated = true
          this.buttonText = 'Fijn.En nu door!'
        })
        .catch((e) => {
          var message = e.reponse ? e.response.data : e.message
          this.showError(
            "Er is iets misgegaan bij het opslaan van je gegevens: '" +
              message +
              "'"
          )
        })
    },
    loadAddress() {
      axios
        .get(
          'https://tegoedje-api.azurewebsites.net/api/address/' +
            this.customer.postalCode +
            '/' +
            this.customer.streetNumber
        )
        .then((response) => {
          this.customer.streetName = response.data.street
          this.customer.city = response.data.city
          this.customer.latitude = response.data.latitude
          this.customer.longitude = response.data.longitude
          this.addressLoaded = true
        })
        .catch((e) => {
          var message = e.reponse ? e.response.data : e.message
          this.showError(
            'Je adresgegevens kunnen niet gevonden worden. (' + message + ')'
          )
        })
    },
    resetAddress() {
      this.addressLoaded = false
    },
    isValidEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    isStringEmpty(s) {
      return !s || s.length === 0
    },
    isValidCocNumber(s) {
      return s.length === 8
    },
    showError(errorMessage) {
      this.errorState = true
      this.errorMessage = errorMessage
    },
    removeError() {
      this.errorState = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

#questions {
  position: relative;
  min-height: 100vh;
  background-color: $color-blue-light;

  #backbtn {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  #tegoedje {
    max-height: 65px;
    margin: 2em 0 3em;
  }

  h1 {
    max-width: 260px;
    margin: 1em auto 2em;
  }

  #address {
    max-width: 323px;
    margin: 24px auto;

    p {
      margin-bottom: 0;
    }
  }

  p.error {
    max-width: 275px;
    padding: 12px 24px;
    margin: 0 auto;
    line-height: 1.6;
    color: white;
    background-color: $color-blue-dark;
    border-radius: 6px;
  }

  button {
    @include buttonstyle();

    border: none;
  }
}
</style>
