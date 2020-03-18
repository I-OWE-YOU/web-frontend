<template>
  <div class="twoladies">
    <div class="ladyimgs">
      <img id="ladyleft" alt role="presentation" src="../assets/img/lady_left.svg" />
      <img id="ladyright" alt role="presentation" src="../assets/img/lady_right.svg" />
    </div>
    <img id="logo" alt="Tegoedje logo" src="../assets/img/logo.svg" />
    <p>Hoe werkt het?</p>
  </div>
</template>

<script>
export default {
  name: "TwoLadies"
};
</script>

<style scoped lang="scss">
.twoladies {
  height: 729px;

  #logo {
    position: absolute;
    bottom: 17%;
    left: 50%;
    margin-left: -147px;
  }

  p {
    position: absolute;
    bottom: 4%;
    left: 0;
    right: 0;
    padding-bottom: 16px;
    background: url("../assets/img/arrowdown.svg") bottom center no-repeat;
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
