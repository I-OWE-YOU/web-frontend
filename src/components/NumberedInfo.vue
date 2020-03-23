<template>
  <div class="numberedinfo" :class="aligndigit">
    <div :class="`circle ${color}`">{{ digit }}</div>
    <div class="texts">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberedInfo',
  props: {
    digit: { type: String, default: '' },
    color: { type: String, default: '' },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    aligndigit: { type: String, default: '' },
  },
}
</script>

<style scoped lang="scss">
@import '@design';

.numberedinfo {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 2em 0;
  text-align: left;
  background-color: $color-blue-darker;

  .texts {
    h2 {
      @include font-size(2.6);

      margin: 6px 0 0;
    }

    p {
      max-width: 8em;
      margin-top: 0;
    }
  }

  .circle {
    width: 90px;
    height: 90px;
    font-weight: bold;
    line-height: 2.1;
    text-align: center;
    border-radius: 50%;
    transform: translateX(-42px);
    @include font-size(4);

    &.light {
      background-color: $color-blue-light;
    }

    &.medium {
      background-color: $color-blue-medium;
    }

    &.dark {
      background-color: $color-blue-dark;
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
