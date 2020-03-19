<template>
  <div id="questions">
    <img id="backbtn" alt="back to homepage" src="../assets/img/backbtn.svg" v-on:click="goBack" />

    <img v-if="errorState" id="tegoedje" alt role="presentation" src="../assets/img/bijnagoed.svg" />
    <img v-else id="tegoedje" alt role="presentation" src="../assets/img/tegoedje.svg" />

    <h1 v-html="questionText"></h1>

    <p v-show="errorState" class="error">{{ errorMessage }}</p>

    <FormField
      v-if="step === 1"
      fieldName="companyName"
      :fieldValue="customer.companyName"
      fieldLabel="Bedrijfsnaam"
      v-on:update:companyName="customer.companyName = $event"
      v-on:change:companyName="errorState=false"
    />

    <FormField
      v-if="step === 2"
      fieldName="cocNumber"
      :fieldValue="customer.cocNumber"
      fieldLabel="KvK nummer"
      v-on:update:cocNumber="customer.cocNumber = $event"
    />

    <FormField
      v-if="step === 3"
      fieldName="firstName"
      :fieldValue="customer.firstName"
      fieldLabel="Voornaam"
      v-on:update:firstName="customer.firstName = $event"
    />

    <FormField
      v-if="step === 3"
      fieldName="lastName"
      :fieldValue="customer.lastName"
      fieldLabel="Achternaam"
      v-on:update:lastName="customer.lastName = $event"
    />

    <FormField
      v-if="step === 4"
      fieldName="postalCode"
      :fieldValue="customer.postalCode"
      fieldLabel="Postcode"
      v-on:update:postalCode="customer.postalCode = $event"
    />

    <FormField
      v-if="step === 4"
      fieldName="streetNumber"
      :fieldValue="customer.streetNumber"
      fieldLabel="Huisnummer"
      v-on:update:streetNumber="customer.streetNumber = $event"
    />

    <div id="address" v-show="addressLoaded">
      <p>We hebben je adres gevonden. Klopt dit niet? Pas dan hierboven je postcode en huisnummer aan.</p>
      <br />
      {{customer.streetName}}&nbsp;{{customer.streetNumber}}
      <br />
      {{customer.postalCode}}&nbsp;{{customer.city}}
    </div>

    <FormField
      v-if="step === 5"
      fieldName="email"
      :fieldValue="customer.email"
      fieldLabel="E-mail"
      description="don't worry, we spammen je niet"
      v-on:update:email="customer.email = $event"
    />

    <FormField
      v-if="step === 6"
      fieldName="IBAN"
      :fieldValue="customer.IBAN"
      fieldLabel="IBAN nummer"
      v-on:update:IBAN="customer.IBAN = $event"
    />

    <div v-if="step === 6">
      <p>checkbox hier</p>
      <h3>Hier komt API call</h3>
    </div>

    <button @click="buttonClicked">{{ buttonText }}</button>
  </div>
</template>

<script>
import axios from "axios";
import IBAN from "iban";
import FormField from "@/components/FormField.vue";

export default {
  name: "Entrepreneur",
  components: {
    FormField
  },
  data: function() {
    return {
      step: 0,
      maxSteps: 6,
      addressLoaded: false,
      errorState: false,
      errorMessage: "",
      texts: [
        "Geweldig!<br />Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen.",
        "Om te beginnen: hoe heet je bedrijf?",
        "Goede naam! We willen graag weten wat je Kamer van Koophandel nummer is, om misbruik tegen te gaan.",
        "Hoe heet je?",
        "Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?",
        "Bijna klaar. Hoe kunnen we je bereiken?",
        "En tot slot, waar mag het geld naartoe FIRSTNAME?",
        ""
      ],
      customer: {
        companyName: "",
        cocNumber: "",
        firstName: "",
        lastName: "",
        streetName: "",
        streetNumber: "",
        postalCode: "",
        city: "",
        longitude: 0.0,
        latitude: 0.0,
        email: "",
        IBAN: ""
      }
    };
  },
  computed: {
    buttonText: function() {
      if (this.addressLoaded) {
        return "Ga verder als het adres klopt";
      } else if (0 === this.step) {
        return "Ga verder";
      } else if (4 === this.step) {
        return "Check postcode";
      } else if (this.maxSteps === this.step) {
        return "Afronden";
      } else {
        return "Volgende";
      }
    },
    questionText: function() {
      var text = this.texts[this.step];
      return text.replace("FIRSTNAME", this.customer.firstName);
    }
  },
  methods: {
    goBack() {
      if (0 === this.step) {
        this.$router.go(-1);
      } else {
        this.step--;
      }
    },
    buttonClicked() {
      if (this.step === this.maxSteps) {
        this.removeError();
        // Call API to process data
        // On success, proceed to next page
      }

      if (this.checkInput()) {
        this.removeError();
        this.step += 1;
      }
    },
    checkInput() {
      switch (this.step) {
        case 0:
          return true;
        case 1:
          if (this.isStringEmpty(this.customer.companyName)) {
            this.showError("Wil je je bedrijfsnaam alsjeblieft invullen?");
            return false;
          }
          return true;
        case 2:
          if (!this.isValidCocNumber(this.customer.cocNumber)) {
            this.showError("Wil je een geldig KvK nummer invullen?");
            return false;
          }
          return true;
        case 3:
          if (
            this.isStringEmpty(this.customer.firstName) ||
            this.isStringEmpty(this.customer.lastName)
          ) {
            this.showError("We willen graag weten hoe je heet! Ah toe?");
            return false;
          }
          return true;
        case 4:
          if (
            this.isStringEmpty(this.customer.postalCode) ||
            this.isStringEmpty(this.customer.streetNumber)
          ) {
            this.showError(
              "Met je postcode en huisnummer zoeken we je locatie op."
            );
            return false;
          }
          if (this.addressLoaded) {
            this.addressLoaded = false;
            return true;
          }
          this.loadAddress();
          return false;
        case 5:
          if (!this.isValidEmail(this.customer.email)) {
            this.showError(
              "Dit e-mail adres ziet er onbruikbaar uit. Wil je het checken?"
            );
            return false;
          }
          return true;
        case 6:
          if (!IBAN.isValid(this.customer.IBAN)) {
            this.showError(
              "Dit IBAN nummer is niet geldig. Sorry dat we even streng zijn, we willen graag dat je je geld krijgt."
            );
            return false;
          }
          return true;
      }
    },
    loadAddress() {
      axios
        .get(
          "https://tegoedje-api.azurewebsites.net/api/address/" +
            this.customer.postalCode +
            "/" +
            this.customer.streetNumber
        )
        .then(response => {
          this.customer.streetName = response.data.street;
          this.customer.city = response.data.city;
          this.customer.latitude = response.data.latitude;
          this.customer.longitude = response.data.longitude;
          this.addressLoaded = true;
        })
        .catch(e => {
          var message = e.reponse ? e.response.data : e.message;
          this.showError(
            "Je adresgegevens kunnen niet gevonden worden. (" + message + ")"
          );
        });
    },
    isValidEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    isStringEmpty(s) {
      return !s || 0 === s.length;
    },
    isValidCocNumber(s) {
      return 8 === s.length;
    },
    showError(errorMessage) {
      this.errorState = true;
      this.errorMessage = errorMessage;
    },
    removeError() {
      this.errorState = false;
    }
  }
};
</script>

<style scoped lang="scss">
#questions {
  background-color: $color_blue_light;
  min-height: 100vh;

  #backbtn {
    position: fixed;
    top: 16px;
    left: 16px;
  }

  #tegoedje {
    margin: 2em 0 3em;
    max-height: 65px;
  }

  h1 {
    margin: 1em auto 2em;
    max-width: 260px;
  }

  #address {
    max-width: 323px;
    margin: 24px auto;

    p {
      margin-bottom: 0;
    }
  }

  p.error {
    background-color: $color_blue_dark;
    color: white;
    border-radius: 6px;
    max-width: 275px;
    margin: 0 auto;
    padding: 12px 24px;
    line-height: 1.6;
  }

  button {
    @include buttonstyle();
    border: none;
  }
}
</style>
