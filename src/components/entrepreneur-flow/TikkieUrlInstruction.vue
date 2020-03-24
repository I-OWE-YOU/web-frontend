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
          src="../../assets/img/Tikkie-plus.png"
        />
      </li>
      <li>
        Selecteer de optie "Laat je vrienden het begrag bepalen".
        <img
          class="tikkie-intruction__image"
          role="presentation"
          src="../../assets/img/Tikkie-checkbox.png"
        />
      </li>
      <li>
        Let op! De naam die je invoert is zichtbaar voor klanten.
      </li>
      <li>
        <div>
          Deel dit betaalverzoek door de deelbare link te kopiëren.
          <div class="tikkie-intruction__icon-container">
            <div>
              <img
                class="tikkie-intruction__icon"
                role="presentation"
                src="../../assets/img/share.svg"
              />
              <br />
              Delen
            </div>
            <div class="tikkie-intruction__right-arrow">&#8594;</div>
            <div>
              <img
                class="tikkie-intruction__icon"
                role="presentation"
                src="../../assets/img/duplicate.svg"
              />
              <br />
              kopiëren
            </div>
          </div>
        </div>
      </li>
      <li>
        Als de link is gekopiëerd, navigeer terug naar deze app en plak de link.
      </li>
    </ol>
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
  padding: 2rem;
  color: $color-text;
  background-color: $color-blue-light;

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 200%;
    cursor: pointer;
  }

  &__image {
    width: 60px;
    margin-left: 0.5rem;
  }

  &__list {
    padding: 1rem;
    margin: 0;
    text-align: left;
    list-style: none;
    counter-reset: my-awesome-counter;

    li {
      display: flex;
      padding-bottom: 2rem;
      line-height: 1.1;
      counter-increment: my-awesome-counter;
      @include font-size($size-content-font-l);

      &::before {
        min-width: 3rem;
        padding-top: 1rem;
        margin-right: 0.5rem;
        font-size: 3rem;
        font-weight: bold;
        content: counter(my-awesome-counter) '.';
      }
    }
  }

  &__icon {
    width: 30px;
  }

  &__icon-container {
    display: flex;
    justify-content: stretch;
    width: 100%;
    height: 8rem;
    padding-top: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    div {
      flex: 1;
      text-align: center;
      vertical-align: middle;
    }
  }

  &__right-arrow {
    @include font-size(4);

    padding-top: 1rem;
  }
}
</style>
