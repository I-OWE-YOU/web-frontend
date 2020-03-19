<template>
  <div id="questions">
    <img id="backbtn" alt="back to homepage" src="../assets/img/backbtn.svg" v-on:click="goBack" />

    <img id="tegoedje" alt role="presentation" src="../assets/img/tegoedje.svg" />

    <h1 v-html="questionText"></h1>

    <FormField
      v-if="step === 1"
      fieldName="companyName"
      :fieldValue="customer.companyName"
      fieldDescription="Bedrijfsnaam"
    />

    <FormField
      v-if="step === 2"
      fieldName="cocNumber"
      :fieldValue="customer.cocNumber"
      fieldDescription="KvK nummer"
    />

    <FormField
      v-if="step === 3"
      fieldName="firstName"
      :fieldValue="customer.firstName"
      fieldDescription="Voornaam"
    />

    <FormField
      v-if="step === 3"
      fieldName="lastName"
      :fieldValue="customer.lastName"
      fieldDescription="Achternaam"
    />

    <FormField
      v-if="step === 4"
      fieldName="postalCode"
      :fieldValue="customer.postalCode"
      fieldDescription="Postcode"
    />

    <FormField
      v-if="step === 4"
      fieldName="streetNumber"
      :fieldValue="customer.streetNumber"
      fieldDescription="Huisnummer"
    />

    <FormField
      v-if="step === 5"
      fieldName="email"
      :fieldValue="customer.email"
      fieldDescription="E-mail"
    />

    <FormField
      v-if="step === 6"
      fieldName="IBAN"
      :fieldValue="customer.IBAN"
      fieldDescription="IBAN nummer"
    />

    <div v-if="step === 6">
      <p>checkbox hier</p>
      <h3>Hier komt API call</h3>
    </div>

    <button v-on:click="step += 1">{{ buttonText }}</button>
  </div>
</template>

<script>
import FormField from "@/components/FormField.vue";

export default {
  name: "Entrepreneur",
  components: {
    FormField
  },
  data: function() {
    return {
      step: 0,
      maxSteps: 5,
      texts: [
        "Geweldig!<br />Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen.",
        "Om te beginnen: hoe heet je bedrijf?",
        "Goede naam! We willen graag weten wat je Kamer van Koophandel nummer is, om misbruik tegen te gaan.",
        "Hoe heet je?",
        "Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?",
        "Bijna klaar. Hoe kunnen we je bereiken?",
        "En tot slot, waar mag het geld naartoe FIRSTNAME?"
      ],
      customer: {
        companyName: null,
        firstName: "",
        lastName: "",
        streetName: "",
        streetNumbernumber: "",
        postalCode: "",
        city: "",
        email: "",
        IBAN: ""
      }
    };
  },
  computed: {
    buttonText: function() {
      if (0 === this.step) {
        return "Ga verder";
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
  }

  h1 {
    margin: 1em auto 2em;
    max-width: 260px;
  }

  button {
    @include buttonstyle();
    border: none;
  }
}
</style>
