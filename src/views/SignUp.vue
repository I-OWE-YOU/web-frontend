<template>
  <amplify-sign-up
    class="auth"
    :sign-up-config="signUpConfig"
  ></amplify-sign-up>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => {
    return {
      signUpConfig: {
        signUpFields: [
          {
            label: 'Email:',
            required: true,
            displayOrder: 1,
            type: 'email',
            key: 'username',
          },
          {
            label: 'Wachtwoord:',
            required: true,
            displayOrder: 2,
            type: 'password',
            key: 'password',
          },
        ],
        hideAllDefaults: true,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@design';
.auth {
  --deepSquidInk: $color-text;
  --input-color: black;

  // div {
  min-width: 200px;
  background-color: $color-blue-light;
  // }

  [class^='Section__sectionFooterSecondaryContent'],
  [class^='Input__inputLabel'] {
    display: none;
  }

  div {
    color: $color-text !important;
  }

  button {
    @include buttonstyle();

    width: 100%;
    line-height: 1.15;
    text-transform: none;
  }
}
</style>
