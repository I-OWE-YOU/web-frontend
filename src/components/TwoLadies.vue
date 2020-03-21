<template>
  <div class="twoladies">
    <div class="ladyimgs">
      <img
        id="ladyleft"
        alt
        role="presentation"
        src="../assets/img/lady_left.svg"
      />
      <img
        id="ladyright"
        alt
        role="presentation"
        src="../assets/img/lady_right.svg"
      />
    </div>
    <h1 id="logo">
      <img alt="Tegoedje, voor nu - voor straks" src="../assets/img/logo.svg" />
    </h1>
    <h2>Hoe werkt het?</h2>
  </div>
</template>

<script>
export default {
  name: 'TwoLadies',
}
</script>

<style scoped lang="scss">
@import '@design';
.twoladies {
  position: relative;
  height: 700px;
  overflow: hidden;
  background-color: $color-blue-light;

  #logo {
    position: absolute;
    bottom: 31%;
    left: 50%;
    margin-left: -144px;

    img {
      width: 60%;
    }
  }

  h2 {
    position: absolute;
    right: 0;
    bottom: 5%;
    left: 0;
    padding-bottom: 16px;
    font-size: 3em;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    background: url('../assets/img/arrowdown.svg') bottom center no-repeat;
  }

  .ladyimgs {
    position: relative;

    #ladyleft {
      position: absolute;
      top: 0;
      left: 0;
    }

    #ladyright {
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
}
</style>
