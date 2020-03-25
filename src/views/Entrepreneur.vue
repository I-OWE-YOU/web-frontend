<template>
  <div id="questions">
    <a href="javascript:void(0);">
      <img
        id="backbtn"
        alt="terug naar de startpagina"
        src="../assets/img/backbtn.svg"
        @click="goBack"
      />
    </a>

    <img
      id="tegoedje"
      alt
      role="presentation"
      src="../assets/img/crisp_logo.svg"
    />

    <EntrepreneurFlowIntro v-if="step === steps.intro"></EntrepreneurFlowIntro>
    <EntrepreneurFlowTermsAndConditions
      v-else-if="step === steps.termsAndCondition"
    ></EntrepreneurFlowTermsAndConditions>

    <template v-else>
      <h1 v-text="questionText" />

      <p v-show="errorMessage" class="error">{{ errorMessage }}</p>

      <div v-show="step === steps.finished" class="success">
        <p>Je bent volledig aangemeld.</p>

        <p>
          Een update van wanneer je de tegoedjes kunt aanbieden aan je (vaste)
          klanten, komt er snel aan.
        </p>
        <p>
          Nu zijn we nog even druk bezig met de laatste zaken. Hou de website
          goed in de gaten want dan gaan onze deuren open...
        </p>
      </div>

      <form action="#">
        <FormField
          v-if="step === steps.companyName"
          v-model="customer.companyName"
          field-name="companyName"
          field-label="Bedrijfsnaam"
        />

        <FormField
          v-if="step === steps.kvkNumber"
          v-model="customer.cocNumber"
          inputmode="numeric"
          field-name="cocNumber"
          field-label="KvK nummer"
        />

        <FormField
          v-if="step === steps.personName"
          v-model="customer.contactFirstName"
          field-name="firstName"
          field-label="Voornaam"
        />

        <FormField
          v-if="step === steps.personName"
          v-model="customer.contactLastName"
          field-name="lastName"
          field-label="Achternaam"
        />

        <FormField
          v-if="step === steps.address"
          v-model="zipCode"
          field-name="postalCode"
          field-label="Postcode"
        />

        <FormField
          v-if="step === steps.address"
          v-model="houseNumber"
          field-name="streetNumber"
          field-label="Huisnummer"
        />

        <div v-if="step === steps.address" v-show="addressLoaded" id="address">
          <p>
            We hebben je adres gevonden. Klopt dit niet? Pas dan hierboven je
            postcode en huisnummer aan.
            <br />
            <br />
            {{ customer.address.street }}&nbsp;{{ houseNumber }}
            <br />
            {{ zipCode }}&nbsp;{{ customer.address.city }}
          </p>
        </div>

        <FormField
          v-if="step === steps.email"
          v-model="customer.email"
          field-name="email"
          field-label="E-mail"
          description="don't worry, we spammen je niet"
        />

        <button
          v-show="step !== steps.finished"
          @click.prevent="buttonClicked"
          >{{ buttonText }}</button
        >
      </form>
    </template>

    <div v-show="isWaitingForApiResponse" id="spinner" role="presentation">
      <img src="../assets/img/timer.svg" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormField from '@components/FormField.vue'
import EntrepreneurFlowIntro from '@components/entrepreneur-flow/EntrepreneurFlowIntro.vue'
import EntrepreneurFlowTermsAndConditions from '@components/entrepreneur-flow/EntrepreneurFlowTermsAndConditions.vue'
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'Entrepreneur',
  components: {
    EntrepreneurFlowIntro,
    EntrepreneurFlowTermsAndConditions,
    FormField,
  },
  data: () => {
    return {
      step: 0,
      steps: {
        intro: 0,
        companyName: 1,
        kvkNumber: 2,
        personName: 3,
        address: 4,
        email: 5,
        termsAndCondition: 6,
        finished: 7,
      },
      addressLoaded: false,
      isWaitingForApiResponse: false,
      errorMessage: '',
      texts: [
        'Geweldig! Top dat je erbij bent. Laten we eerst je account personaliseren. Dan kunnen we je makkelijker helpen.',
        'Om te beginnen: hoe heet je bedrijf?',
        'We willen graag weten wat je Kamer van Koophandel nummer is. Zo kunnen we misbruik tegengaan.',
        'Hoe heet je?',
        'Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?',
        'Bijna klaar. Hoe kunnen we je bereiken?',
        'Top! Je bent klaar.',
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
      },
    }
  },
  computed: {
    buttonText: function() {
      if (this.addressLoaded) {
        return 'Ja! Dit adres klopt.'
      }

      switch (this.step) {
        case this.steps.intro:
          return 'Ga verder'
        case this.steps.address:
          return 'Check postcode'
        case this.steps.finished:
          return 'Fijn. En nu door!'
        default:
          return 'Volgende'
      }
    },
    questionText: function() {
      var text = this.texts[this.step] ? this.texts[this.step] : ''
      return text.replace('FIRSTNAME', this.customer.contactFirstName)
    },
  },
  mounted() {
    const self = this
    EventBus.$on('valueChange', function() {
      self.removeError()
      if (self.step === self.steps.address) {
        self.resetAddress()
      }
    })

    EventBus.$on('goBack', () => {
      if (this.step === this.steps.intro) {
        this.$router.go(-1)
      } else {
        this.step--
      }
    })

    EventBus.$on('EntrepreneurFlow.next', () => {
      this.buttonClicked()
    })
  },
  methods: {
    goBack() {
      if (this.step === this.steps.intro) {
        this.$router.go(-1)
      } else {
        this.step--
      }
    },
    buttonClicked() {
      if (this.checkInput()) {
        this.removeError()

        if (this.step === this.steps.termsAndCondition) {
          this.postData()
        } else {
          this.step += 1
        }
      }
    },
    checkInput() {
      switch (this.step) {
        case this.steps.intro:
          return true
        case this.steps.termsAndCondition:
          return true
        case this.steps.companyName:
          if (this.isStringEmpty(this.customer.companyName)) {
            this.showError('Wil je je bedrijfsnaam alsjeblieft invullen?')
            return false
          }
          return true
        case this.steps.kvkNumber:
          if (!this.isValidCocNumber(this.customer.cocNumber)) {
            this.showError('Wil je een geldig KvK nummer invullen?')
            return false
          }
          return true
        case this.steps.personName:
          if (
            this.isStringEmpty(this.customer.contactFirstName) ||
            this.isStringEmpty(this.customer.contactLastName)
          ) {
            this.showError('We willen graag weten hoe je heet! Ah toe?')
            return false
          }
          return true
        case this.steps.address:
          if (!this.isValidZipCode(this.zipCode)) {
            this.showError(
              'Je postcode bestaat niet uit 4 letters en 2 cijfers.'
            )
            return false
          }
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
        case this.steps.email:
          if (!this.isValidEmail(this.customer.email)) {
            this.showError(
              'Dit e-mail adres ziet er onbruikbaar uit. Wil je het checken?'
            )
            return false
          }
          return true
      }
    },
    postData() {
      this.isWaitingForApiResponse = true
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/api/companies`, this.customer)
        .then((response) => {
          this.step += 1
        })
        .catch((e) => {
          var message = e.reponse ? e.response.data : e.message
          this.showError(
            "Er is iets misgegaan bij het opslaan van je gegevens: '" +
              message +
              "'"
          )
        })
        .finally(() => {
          this.isWaitingForApiResponse = false
        })
    },
    loadAddress() {
      this.isWaitingForApiResponse = true
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/address/${this.zipCode}/${this.houseNumber}`
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
        .finally(() => {
          this.isWaitingForApiResponse = false
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
    isValidZipCode(z) {
      var ze = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
      return ze.test(z)
    },
    showError(errorMessage) {
      this.errorMessage = errorMessage
    },
    removeError() {
      this.errorMessage = null
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
        color: $color-button-text;
        white-space: nowrap;
        content: attr(title);
        border-radius: 0.5em;
      }
    }
  }

  #tegoedje {
    width: 30%;
    margin: 3em 0 3em;
  }

  h1 {
    max-width: 260px;
    margin: 1em auto 2em;
  }

  h2 {
    @include responsive-in-small-screens();

    margin: auto;
  }

  #spinner {
    margin: 3em 0;
    animation: rotation 2s infinite linear;
  }

  #address {
    @include responsive-in-small-screens();

    margin: 3em auto;

    p {
      @include font-size(1.9);

      padding: 0 1em;
      line-height: 1.2;
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

    margin: 1rem 0;
  }

  .success {
    padding: 0 2rem;
    font-weight: bold;
    line-height: 1.2;
  }

  #appLinks a {
    padding: 1rem;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
