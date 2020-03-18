<template>
  <div class="numberedinfo" :class="aligndigit">
    <div class="circle" :class="color">{{ digit }}</div>
    <div class="texts">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberedInfo",
  props: {
    digit: Number,
    color: String,
    title: String,
    text: String,
    aligndigit: String
  }
};
</script>

<style scoped lang="scss">
.numberedinfo {
  background-color: $color_blue_darker;
  padding: 2em 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;

  .texts {
    h3 {
      @include font-size(2.6);
      font-weight: bold;
      margin: 6px 0 0;
    }

    p {
      margin-top: 0;
      max-width: 8em;
    }
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    line-height: 2.1;
    @include font-size(4);
    font-weight: bold;
    text-align: center;
    transform: translateX(-42px);

    &.light {
      background-color: $color_blue_light;
    }

    &.medium {
      background-color: $color_blue_medium;
    }

    &.dark {
      background-color: $color_blue_dark;
    }
  }

  &.right {
    flex-direction: row-reverse;

    .circle {
      transform: translateX(42px);
    }
  }
}
</style>
