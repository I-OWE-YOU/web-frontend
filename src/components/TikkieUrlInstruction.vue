<template>
  <div class="tikkie-intruction">
    <div class="tikkie-intruction__close" @click="onClose">X</div>

    <h1>Ze maak &amp; deel je een Tikkie</h1>
    <ol class="tikkie-intruction__list">
      <li>
        Druk op de plus om een nieuwe Tikkie te maken.
        <img
          class="tikkie-intruction__image"
          role="presentation"
          src="../assets/img/Tikkie-plus.png"
        />
      </li>
      <li>
        Selecteer de optie "Laat je vrienden het begrag bepalen".
        <img
          class="tikkie-intruction__image"
          role="presentation"
          src="../assets/img/Tikkie-checkbox.png"
        />
      </li>
      <li>Let op! De naam die je invoert is zichtbaar voor klanten.</li>
      <li>
        Deel dit betaalverzoek door de deelbare link te kopiëren.
        <div class="tikkie-intruction__icon-container">
          <div>
            <img
              class="tikkie-intruction__icon"
              role="presentation"
              src="../assets/img/share.svg"
            />
            Delen
          </div>
          <div>
            <img
              class="tikkie-intruction__icon"
              role="presentation"
              src="../assets/img/duplicate.svg"
            />
            kopiëren
          </div>
        </div>
      </li>
      <li>
        Als de link is gekopiëerd, navigeer terug naar deze app en plak de link.
      </li>
    </ol>
    <button @click="onClose">Volgende</button>
  </div>
</template>

<script>
export default {
  name: 'TikkieUrlInstruction',
  props: {
    link: {
      type: String,
      default: '',
    },
    linktext: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClose() {
      this.$emit('dialog-closed')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@design';
.tikkie-intruction {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  color: $color-text;
  background-color: $color-blue-light;

  &__close {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 200%;
  }

  &__image {
    float: right;
    width: 60px;
  }

  &__list {
    text-align: left;

    li {
      min-height: 100px;
    }
  }

  &__icon {
    width: 30px;
  }

  &__icon-container {
    display: flex;
    justify-content: stretch;
  }
}
</style>
