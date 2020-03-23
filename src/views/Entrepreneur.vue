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

    <TikkieUrlInstruction
      v-if="showHowToDoTikkieUrl"
      @dialog-closed="showHowToDoTikkieUrl = false"
    >
    </TikkieUrlInstruction>

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

    <p v-show="errorState" class="error">{{ errorMessage }}</p>

    <p v-show="accountCreated" class="success">Je aanmelding is compleet!</p>

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

      <div v-if="step === 4" v-show="addressLoaded" id="address">
        <p>
          We hebben je adres gevonden. Klopt dit niet? Pas dan hierboven je
          postcode en huisnummer aan.
        </p>
        <br />
        {{ customer.address.street }}&nbsp;{{ houseNumber }}
        <br />
        {{ zipCode }}&nbsp;{{ customer.address.city }}
      </div>

      <FormField
        v-if="step === steps.email"
        v-model="customer.email"
        field-name="email"
        field-label="E-mail"
        description="don't worry, we spammen je niet"
      />

      <h2 v-if="step === steps.doYouHaveTikkie">
        Dit doen here met Tikkie, heb je dat?
      </h2>

      <template v-if="step === steps.tikkieUrl">
        <div>
          Maak een Tikkie en selecteer de optie "Laat je vrienden het bedrag
          bepalen".
        </div>

        <a
          target="_blank"
          href="https://tikkie.me/open/"
          class="open-tikkie-link"
          rel="noopener"
        >
          Open Tikkie
        </a>

        <div id="howToDoTikkieUrl" @click="showHowToDoTikkieUrl = true">
          Zo doe je dat
        </div>

        <FormField
          v-model="customer.tikkieUrl"
          field-name="tikkieUrl"
          field-label="Tikkie URL"
        />

        <div>
          <p>checkbox here to accept terms</p>
        </div>
      </template>

      <button @click.prevent="buttonClicked">
        {{ buttonText }}
      </button>

      <div v-if="step === steps.doYouHaveTikkie" class="no-tikkie-sign">
        Geen Tikkie? Helemaal niet erg. Installer het nu.
        <div id="appLinks">
          <a
            target="_blank"
            href="https://itunes.apple.com/nl/app/tikkie/id1112935685"
            rel="noopener"
          >
            App Store
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.abnamro.nl.tikkie"
            rel="noopener"
          >
            Google play
          </a>
        </div>
      </div>
    </form>

    <div
      v-if="step === 4 || step === 6"
      v-show="isWaitingForApiResponse"
      id="spinner"
      role="presentation"
    >
      <img src="../assets/img/timer.svg" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormField from '@components/FormField.vue'
import TikkieUrlInstruction from '@components/TikkieUrlInstruction.vue'
import { EventBus } from '@plugins/event-bus.js'

export default {
  name: 'Entrepreneur',
  components: {
    FormField,
    TikkieUrlInstruction,
  },
  data: function() {
    return {
      step: 0,
      steps: {
        intro: 0,
        companyName: 1,
        kvkNumber: 2,
        personName: 3,
        address: 4,
        email: 5,
        doYouHaveTikkie: 6,
        tikkieUrl: 7,
        finished: 8,
      },
      showHowToDoTikkieUrl: false,
      addressLoaded: false,
      accountCreated: false,
      errorState: false,
      isWaitingForApiResponse: false,
      errorMessage: '',
      texts: [
        'Geweldig! Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen.',
        'Om te beginnen: hoe heet je bedrijf?',
        'Goede naam! We willen graag weten wat je Kamer van Koophandel nummer is, om misbruik tegen te gaan.',
        'Hoe heet je?',
        'Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?',
        'Bijna klaar. Hoe kunnen we je bereiken?',
        'En tot slot, waar mag het geld naartoe FIRSTNAME?',
        'Super belangrijk',
        'Goed gedaan',
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
      if (this.accountCreated) {
        return 'Fijn. En nu door!'
      }

      if (this.addressLoaded) {
        return 'Ja! Dit adres klopt.'
      }

      switch (this.step) {
        case this.steps.intro:
          return 'Ga verder'
        case this.steps.address:
          return 'Check postcode'
        case this.steps.doYouHaveTikkie:
          return 'Ja, ik heb Tikkie'
        default:
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
      if (this.step === this.steps.intro) {
        this.$router.go(-1)
      } else {
        this.step--
      }
    },
    buttonClicked() {
      if (this.accountCreated) {
        // TODO goto result page
      }

      if (this.checkInput()) {
        this.removeError()

        if (this.step === this.steps.tikkieUrl) {
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
        case this.steps.doYouHaveTikkie:
          return true
        case this.steps.tikkieUrl:
          if (!this.isValidTiikieUrl(this.customer.tikkieUrl)) {
            this.showError(
              'Dit tikkie url ziet er onbruikbaar uit. Wil je het checken?'
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
          this.accountCreated = true
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
    isValidTiikieUrl(tikkieUrl) {
      // TODO I'm not familiar with tikkie link format. More strict check could be useful.
      return (
        tikkieUrl && tikkieUrl.toLowerCase().startsWith('https://tikkie.me')
      )
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

  #spinner {
    margin: 3em 0;
    animation: rotation 2s infinite linear;
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

  button,
  .open-tikkie-link {
    @include buttonstyle();

    margin: 1rem 0;
    border: none;
  }

  .open-tikkie-link {
    line-height: 1.15;
  }

  .no-tikkie-sign {
    padding-top: 1rem;
  }

  #appLinks a {
    padding: 1rem;
  }

  #howToDoTikkieUrl {
    font-size: $size-content-font + rem;
    text-decoration: underline;
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
