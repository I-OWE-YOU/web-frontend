<template>
  <div>
    <h2>Gelukt</h2>
    <p
      >{{ companyName }} wilt je ontzettend bedanken voor je hulp in deze
      moeilijke tijden.</p
    >
    <p>
      Zodra jouw betaling is bevestigd ontvang je direct een e-mail met jouw
      Tegoedje.
    </p>
    <p>Laten we hopen dat de zaken weer gauw gaan lopen.</p>
  </div>
</template>

<script>
export default {
  name: 'SuccessfullyPayment',
  data: () => {
    return {
      companyName: '',
    }
  },
  async mounted() {
    this.companyName = this.$route.query.company_name
  },
}
</script>
