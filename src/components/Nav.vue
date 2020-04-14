<template>
  <nav class="header__nav w-100 position-absolute">
    <ul class="header__navbar px-0 m-0">
      <li class="header__icon">
        <transition name="slide-fade">
          <!-- Header nav menu icons -->
          <button v-if="showNav" key="on" @click="showNav = false">
            <svg
              class="text-danger"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.5857 15.9999L5.95947 7.37369L7.37369 5.95947L15.9999 14.5857L24.6261 5.95947L26.0404 7.37369L17.4141 15.9999L26.0404 24.6261L24.6261 26.0404L15.9999 17.4141L7.37369 26.0404L5.95947 24.6261L14.5857 15.9999Z"
                fill="#FB6B87"
              />
            </svg>
          </button>
          <button v-else key="off" @click="showNav = true">
            <svg
              width="26"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.6668 2H0.333496V0H25.6668V2ZM19.0002 11.3333H0.333496V9.33333H19.0002V11.3333ZM25.6668 20.6667H0.333496V18.6667H25.6668V20.6667Z"
                fill="white"
              />
            </svg>
          </button>
        </transition>
        <!-- Dropdown Menu -->
        <transition name="dropdown">
          <div
            v-if="showNav"
            class="dropdown__menu bg-white w-100"
            :class="{ active: showNav }"
            @click="showNav = false"
          >
            <ul class="dropdown__menu-nav pt-4">
              <li class="dropdown__menu-item py-2">
                <router-link :to="routes.home">
                  <svg
                    class="dropdown__menu-link-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.625 -0.227051L20.75 8.22512V19.3369C20.75 21.9094 18.6317 23.9999 16.0526 23.9999H5.19737C2.61829 23.9999 0.5 21.9094 0.5 19.3369V8.22512L10.625 -0.227051ZM2 8.9269V19.3369C2 21.0687 3.43434 22.4999 5.19737 22.4999H16.0526C17.8157 22.4999 19.25 21.0687 19.25 19.3369V8.9269L10.625 1.7269L2 8.9269Z"
                      fill="#FB6B87"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.40784 15.6521H13.842V23.2499H12.342V17.1521H8.90784V23.2499H7.40784V15.6521Z"
                      fill="#FB6B87"
                    />
                  </svg>
                  <span class="dropdown__menu-link-text">Tegoedje.nu</span>
                </router-link>
              </li>
              <li class="dropdown__menu-item py-2">
                <router-link :to="routes.customer">
                  <svg
                    class="dropdown__menu-link-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 4.94312H24V10.3977H0V4.94312ZM1.5 6.44312V8.89766H22.5V6.44312H1.5Z"
                        fill="#FB6B87"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.8607 18.7864L20.5454 9.59204L22.0413 9.70345L21.3567 18.8949C21.3567 18.8954 21.3567 18.8958 21.3566 18.8962C21.1815 21.3646 19.143 23.25 16.6956 23.25H7.30425C4.85691 23.25 2.81839 21.3648 2.64318 18.8964C2.64314 18.8959 2.64311 18.8954 2.64307 18.8949L1.9585 9.70345L3.45435 9.59204L4.13935 18.7892C4.25831 20.4724 5.64338 21.75 7.30425 21.75H16.6956C18.3564 21.75 19.7415 20.4724 19.8605 18.7892L19.8607 18.7864Z"
                        fill="#FB6B87"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.25 22.4999V5.69312H12.75V22.4999H11.25Z"
                        fill="#FB6B87"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.10874 1.5C6.16083 1.5 5.41309 2.24423 5.41309 3.22159C5.41309 4.19895 6.16083 4.94318 7.10874 4.94318V6.44318C5.31752 6.44318 3.91309 5.01242 3.91309 3.22159C3.91309 1.43077 5.31752 0 7.10874 0C7.88923 0 8.57606 0.142424 9.20455 0.533289C9.81004 0.909848 10.2936 1.47563 10.7554 2.19653C11.0003 2.51903 11.4759 3.30863 11.8633 3.96494C12.0728 4.31977 12.2696 4.65866 12.4141 4.90864C12.4863 5.03371 12.5455 5.13668 12.5867 5.20847L12.6511 5.3208L11.3487 6.065L11.2857 5.95506C11.2451 5.88435 11.1867 5.78265 11.1152 5.65901C10.9723 5.41159 10.7779 5.07696 10.5715 4.72739C10.1416 3.99901 9.70876 3.29031 9.55329 3.09391L9.52929 3.06359L9.50853 3.03095C9.09557 2.38176 8.75251 2.01858 8.41238 1.80705C8.08707 1.60474 7.69781 1.5 7.10874 1.5Z"
                        fill="#FB6B87"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.7954 0.533289C15.4239 0.142424 16.1108 0 16.8912 0C18.6825 0 20.0869 1.43077 20.0869 3.22159C20.0869 5.01242 18.6825 6.44318 16.8912 6.44318V4.94318C17.8392 4.94318 18.5869 4.19895 18.5869 3.22159C18.5869 2.24423 17.8392 1.5 16.8912 1.5C16.3022 1.5 15.9129 1.60474 15.5876 1.80705C15.2475 2.01858 14.9044 2.38176 14.4915 3.03095L14.4707 3.06359L14.4467 3.09391C14.2912 3.29031 13.8583 3.99901 13.4284 4.72739C13.2221 5.07696 13.0277 5.41159 12.8848 5.65901C12.8133 5.78265 12.7548 5.88435 12.7143 5.95506L12.6515 6.06462L11.3486 5.3213L11.4133 5.20847C11.4545 5.13668 11.5137 5.03371 11.5859 4.90864C11.7303 4.65866 11.9272 4.31977 12.1367 3.96494C12.524 3.30863 12.9997 2.51903 13.2445 2.19653C13.7064 1.47563 14.1899 0.909848 14.7954 0.533289Z"
                        fill="#FB6B87"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <path d="M0 0H24V24H0V0Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span class="dropdown__menu-link-text"
                    >Support een ondernemer</span
                  >
                </router-link>
              </li>
              <li class="dropdown__menu-item py-2">
                <router-link
                  :to="signedIn ? routes.entrepreneur : routes.signup"
                >
                  <svg
                    class="dropdown__menu-link-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.7089 1.5736C18.5946 1.42557 17.4623 1.50131 16.3769 1.79654C15.2915 2.09178 14.274 2.60079 13.383 3.29473C12.4919 3.98868 11.7448 4.85395 11.1849 5.84118L11.1835 5.84366L6.89861 13.3321C7.69203 13.7043 8.53838 13.9521 9.40845 14.0656C10.5249 14.2112 11.6589 14.1329 12.7455 13.8352C13.8321 13.5374 14.8504 13.0259 15.7419 12.3296C16.6334 11.6333 17.3808 10.7658 17.9407 9.77652L17.9431 9.77222L18.834 8.22214L14.5133 5.19557H20.3874L22.1875 2.30039C21.4037 1.93319 20.5681 1.68774 19.7089 1.5736ZM5.86135 13.6347L5.21038 13.2623L9.88016 5.10117L9.88089 5.0999C10.5376 3.94233 11.4144 2.92661 12.4613 2.11129C13.5086 1.29566 14.7054 0.69669 15.9832 0.349131C17.261 0.00156782 18.5943 -0.0876509 19.9065 0.0866652C21.2186 0.26098 22.4835 0.695346 23.6284 1.36453L24.2938 1.75347L21.2211 6.69557H19.2692L20.818 7.78044L19.2461 10.5154L19.2448 10.5177C18.5884 11.6768 17.7119 12.6943 16.6652 13.5118C15.6178 14.3299 14.4205 14.9315 13.1419 15.2819C11.8632 15.6322 10.5286 15.7244 9.21444 15.553C7.90032 15.3816 6.6329 14.95 5.48474 14.2833L5.86135 13.6347Z"
                      fill="#FB6B87"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.100098 22.1254L5.21151 13.2601L6.51099 14.0093L1.39958 22.8746L0.100098 22.1254Z"
                      fill="#FB6B87"
                    />
                  </svg>

                  <span class="dropdown__menu-link-text"
                    >Schrijf je in als ondernemer</span
                  >
                </router-link>
              </li>
              <li v-if="signedIn" class="dropdown__menu-item pb-3 py-2">
                <svg
                  class="dropdown__menu-link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 0H19.8C22.1114 0 24 1.90174 24 4.22917V20.7708C24 23.0983 22.1114 25 19.8 25H6V16.7292H7.2V23.7917H19.8C21.4486 23.7917 22.8 22.4309 22.8 20.7708V4.22917C22.8 2.56909 21.4486 1.20833 19.8 1.20833H7.2V8.27083H6V0Z"
                    fill="#FB6B87"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 13H0V12H16V13Z"
                    fill="#FB6B87"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.7989 7L16 12.5L10.7989 18L10 17.1552L14.4022 12.5L10 7.8448L10.7989 7Z"
                    fill="#FB6B87"
                  />
                </svg>

                <SignOut class="dropdown__menu-link-text" />
              </li>

              <li v-else class="dropdown__menu-item pb-3 py-2">
                <router-link :to="routes.signin">
                  <svg
                    class="dropdown__menu-link-icon"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 0H19.8C22.1114 0 24 1.90174 24 4.22917V20.7708C24 23.0983 22.1114 25 19.8 25H6V16.7292H7.2V23.7917H19.8C21.4486 23.7917 22.8 22.4309 22.8 20.7708V4.22917C22.8 2.56909 21.4486 1.20833 19.8 1.20833H7.2V8.27083H6V0Z"
                      fill="#FB6B87"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 13H0V12H16V13Z"
                      fill="#FB6B87"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.7989 7L16 12.5L10.7989 18L10 17.1552L14.4022 12.5L10 7.8448L10.7989 7Z"
                      fill="#FB6B87"
                    />
                  </svg>
                  <span class="dropdown__menu-link-text">Inloggen</span>
                </router-link>
              </li>

              <li class="dropdown__menu-item py-2 ml-4 pl-3">
                <div class="dropdown__menu-link-text--small">
                  <router-link :to="routes.termsAndConditions"
                    >Algemene voorwaarden</router-link
                  >
                </div>
              </li>
              <li class="dropdown__menu-item pt-3 pb-5 ml-4 pl-3">
                <div class="dropdown__menu-link-text--small">
                  <router-link :to="routes.privacyStatement"
                    >Privacyverklaring</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { routes } from '@router/routes'
import { AuthStateValue } from '@views/constants'
import SignOut from '@components/SignOut.vue'

export default {
  name: 'Nav',
  components: {
    SignOut,
  },
  data: () => {
    return {
      routes: routes,
      showNav: false,
      signedIn: false,
    }
  },
  watch: {
    $route() {
      this.showNav = false
      this.isUserLoggedIn()
    },
  },
  created() {
    this.isUserLoggedIn()

    AmplifyEventBus.$on('authState', (state) => {
      if (state === AuthStateValue.SIGNED_IN) {
        this.isUserLoggedIn()
      } else {
        this.signedIn = false
      }
    })
  },
  methods: {
    async isUserLoggedIn() {
      try {
        await Auth.currentAuthenticatedUser()
        this.signedIn = true
      } catch (e) {
        this.signedIn = false
      }
    },
  },
}
</script>

<style lang="scss">
@import '@design';

.header {
  &__nav {
    z-index: 3;
    font-family: $roboto-font-family;
  }
  &__navbar {
    list-style-type: none;
  }
  &__icon > button {
    position: absolute;
    top: 1rem;
    right: 0;
    z-index: 4;
    background-color: transparent;
    border: 0;
  }
}

.dropdown {
  &__menu::after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100vw;
    height: 2rem;
    margin: -1px;
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='isolation:isolate' viewBox='717 479 50 32' width='50' height='32'%3E%3Cdefs%3E%3CclipPath id='_clipPath_TA7k24bvFj3NLcPZPhqFr8BJCKgq6mSN'%3E%3Crect x='717' y='479' width='50' height='32'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg clip-path='url(%23_clipPath_TA7k24bvFj3NLcPZPhqFr8BJCKgq6mSN)'%3E%3Cpath d=' M 760 511 L 767 511 L 767 479 L 717 479 L 717 511 L 724 511 C 724 501.066 732.066 493 742 493 C 751.934 493 760 501.066 760 511 Z ' fill-rule='evenodd' fill='white'/%3E%3C/g%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: 0 50%;
    background-size: 3.125rem 2rem;
    transform: translateX(-50%);
  }
  &__menu-item {
    text-align: left;
    > a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  &__menu-link-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: $danger;
  }
  &__menu-link-text {
    margin-left: 1rem;
    font-size: 1.4rem;
    color: $header-link-color;
    &--small {
      > a,
      > a:visited {
        font-size: 1rem;
        color: $header-link-gray-color;
      }
    }
  }
}
// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100px);
}
.slide-fade-leave-active {
  transform: translateY(-100px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
