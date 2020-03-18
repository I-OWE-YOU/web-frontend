<template>
  <div id="questions">
    <img id="backbtn" alt="back to homepage" src="../assets/img/backbtn.svg" v-on:click="goBack" />

    <img id="tegoedje" alt role="presentation" src="../assets/img/tegoedje.svg" />

    <h1 v-html="questionText"></h1>

    <div v-if="step === 1">
      <input type="text" v-model="customer.companyName" placeholder="Bedrijfsnaam" />
    </div>

    <div v-if="step === 2">
      <input type="text" v-model="customer.firstName" placeholder="Voornaam" />
      <input type="text" v-model="customer.lastName" placeholder="Achternaam" />
    </div>

    <div v-if="step === 3">
      <input type="text" v-model="customer.street" placeholder="Straatnaam" />
      <input type="text" v-model="customer.postalCode" placeholder="Postcode" />
      <input type="text" v-model="customer.city" placeholder="Plaats" />
    </div>

    <div v-if="step === 4">
      <input type="text" v-model="customer.email" placeholder="E-mail" />
      <p>don't worry, we spammen je niet</p>
    </div>

    <div v-if="step === 5">
      <input type="text" v-model="customer.IBAN" placeholder="IBAN" />
      <p>checkbox hier</p>
      <h3>Hier komt API call</h3>
    </div>

    <button v-on:click="step += 1">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: "Entrepreneur",
  data: function() {
    return {
      step: 0,
      maxSteps: 5,
      texts: [
        "Geweldig!<br />Goed dat je er bent. Laten we eerst je account personaliseren zowat we je makkelijker kunnen helpen.",
        "Om te beginnen: hoe heet je bedrijf?",
        "Hoe heet je?",
        "Leuk je te leren kennen, FIRSTNAME! Waar zit je bedrijf?",
        "Bijna klaar. Hoe kunnen we je bereiken?",
        "En tot slot, waar mag het geld naartoe FIRSTNAME?"
      ],
      customer: {
        companyName: "",
        firstName: "",
        lastName: "",
        street: "",
        number: "",
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

  input[type="text"] {
    @include inputtextstyle();
    margin-bottom: 2em;
  }
}
</style>
