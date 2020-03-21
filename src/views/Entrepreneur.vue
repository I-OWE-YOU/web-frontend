<template>
  <div id="questions">
    <img
      id="backbtn"
      alt="back to homepage"
      title="terug"
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
      src="../assets/img/crisp_logo.svg"
    />

    <h1 v-text="questionText" />

    <p v-show="errorState" class="error">{{ errorMessage }}</p>

    <p v-show="accountCreated" class="success">Je aanmelding is compleet!</p>

    <form action="#">
      <FormField
        v-if="step === 1"
        v-model="customer.companyName"
        field-name="companyName"
        field-label="Bedrijfsnaam"
      />

      <FormField
        v-if="step === 2"
        v-model="customer.cocNumber"
        field-name="cocNumber"
        field-label="KvK nummer"
      />

      <FormField
        v-if="step === 3"
        v-model="customer.contactFirstName"
        field-name="firstName"
        field-label="Voornaam"
      />

      <FormField
        v-if="step === 3"
        v-model="customer.contactLastName"
        field-name="lastName"
        field-label="Achternaam"
      />

      <FormField
        v-if="step === 4"
        v-model="zipCode"
        field-name="postalCode"
        field-label="Postcode"
      />

      <FormField
        v-if="step === 4"
        v-model="houseNumber"
        field-name="streetNumber"
        field-label="Huisnummer"
      />

      <div v-show="addressLoaded" id="address">
        <p>
          We hebben je adres gevonden. Klopt dit niet? Pas dan hierboven je
          postcode en huisnummer aan.
        </p>
        <br />
        <p>
          {{ customer.address.street }}&nbsp;{{ houseNumber }}
          <br />
          {{ zipCode }}&nbsp;{{ customer.address.city }}
        </p>
      </div>

      <FormField
        v-if="step === 5"
        v-model="customer.email"
        field-name="email"
        field-label="E-mail"
        description="don't worry, we spammen je niet"
      />

      <FormField
        v-if="step === 6"
        v-model="customer.iban"
        field-name="IBAN"
        field-label="IBAN nummer"
      />

      <div v-if="step === 7">
        <p>checkbox here to accept terms</p>
      </div>

      <button @click.prevent="buttonClicked">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import IBAN from 'iban'
import FormField from '@components/FormField.vue'
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'Entrepreneur',
  components: {
    FormField,
  },
  data: function() {
    return {
      checkedNames: [],
      step: 0,
      maxSteps: 6,
      addressLoaded: false,
      accountCreated: false,
      errorState: false,
      errorMessage: '',
      texts: [
        'Geweldig! Top dat je er bij bent. Laten we eerst je account personaliseren. Dan kunnen we je makkelijker helpen.',
        'Om te beginnen: hoe heet je bedrijf?',
        'Goede naam! We willen graag weten wat je Kamer van Koophandel nummer is, om misbruik tegen te gaan.',
        'Hoe heet je?',
        'Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?',
        'Bijna klaar. Hoe kunnen we je bereiken?',
        'En tot slot, waar mag het geld naartoe FIRSTNAME?',
        '',
      ],
      houseNumber: '',
      zipCode: '',
      customer: {
        companyName: '',
        cocNumber: '',
        contactFirstName: '',
        contactLastName: '',
        streetName: '',
        city: '',
        longitude: 0.0,
        latitude: 0.0,
        email: '',
        iban: '',
        address: {},
        avw: '',
      },
    }
  },
  computed: {
    checkedComputed() {
      return this.checkedNames
    },

    buttonText: function() {
      if (this.addressLoaded) {
        return 'Ja! Dit adres klopt.'
      } else if (this.step === 0) {
        return 'Ga verder'
      } else if (this.step === 4) {
        return 'Controleer je postcode'
      } else if (this.maxSteps === this.step) {
        return 'Afronden'
      } else {
        return 'Volgende'
      }
    },
    questionText: function() {
      var text = this.texts[this.step]
      return text.replace('FIRSTNAME', this.customer.contactFirstName)
    },
  },
  mounted() {
    const self = this
    EventBus.$on('valueChange', function() {
      self.removeError()
      if (self.step === 4) {
        self.resetAddress()
      }
    })
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

        // case 7:
        //   if (!AVW.isTrue(this.customer.avw)) {
        //     this.showError(
        //       'Klik nog wel even de Algemene Voorwaarden aan om verder te kunnen.'
        //     )
        //     return false
        //   }
        //   return true
      }
    },

    postData() {
      axios
        .post(
          'https://tegoedje-api.azurewebsites.net/api/companies',
          this.customer
        )
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
            this.zipCode +
            '/' +
            this.houseNumber
        )
        .then((response) => {
          this.customer.address = response.data
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
  // background-color: $color-blue-light;

  background: #357cff;
  background: -moz-linear-gradient(top, #357cff 0%, #004f99 100%);
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, #357cff),
    color-stop(100%, #004f99)
  );
  background: -webkit-linear-gradient(top, #357cff 0%, #004f99 100%);
  background: -o-linear-gradient(top, #357cff 0%, #004f99 100%);
  background: -ms-linear-gradient(top, #357cff 0%, #004f99 100%);
  background: linear-gradient(to bottom, #357cff 0%, #004f99 100%);
  filter: progid:dximagetransform.microsoft.gradient( startColorstr='#357cff', endColorstr='#004f99', GradientType=0 );
  #backbtn {
    position: absolute;
    top: 60px;
    left: 46px;

    &:hover {
      cursor: pointer;

      &::after {
        position: absolute;
        bottom: 1.35em;
        left: 1em;
        z-index: 98;
        display: block;
        padding: 0.3em 1em;
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        content: attr(title);
        border-radius: 0.5em;
      }
    }
  }

  #tegoedje {
    width: 30%;
    // max-height: 65px;
    margin: 3em 0 3em;
  }

  h1 {
    max-width: 260px;
    margin: 1em auto 2em;
    line-height: 1.1;
  }

  #address {
    max-width: 323px;
    margin: 24px auto;

    p {
      margin-bottom: 0;
    }
  }

  p.error {
    max-width: 328px;
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
