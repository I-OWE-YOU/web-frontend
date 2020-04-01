<template>
  <nav class="header__nav w-100 position-absolute">
    <ul class="header__navbar px-0">
      <li class="header__icon">
        <transition name="slide-fade">
          <!-- Header nav menu icons -->
          <button v-if="showNav" key="on" @click="showNav = false">
            <b-icon-x class="text-danger" font-scale="3"></b-icon-x>
          </button>
          <button v-else key="off" @click="showNav = true">
            <b-icon-justify class="text-white" font-scale="3"></b-icon-justify>
          </button>
        </transition>
        <!-- Dropdown Menu -->
        <transition name="dropdown">
          <div
            v-if="showNav"
            class="dropdown__menu bg-white w-100"
            :class="{ active: showNav }"
          >
            <ul class="dropdown__menu-nav pt-4">
              <li class="dropdown__menu-item py-3">
                <router-link :to="routes.home">
                  <b-icon-house
                    font-scale="2"
                    class="dropdown__menu-link-icon"
                  ></b-icon-house>
                  <span class="dropdown__menu-link-text">Home page</span>
                </router-link>
              </li>
              <li class="dropdown__menu-item py-3">
                <router-link :to="routes.customer">
                  <b-icon-gift
                    font-scale="2"
                    class="dropdown__menu-link-icon"
                  ></b-icon-gift>
                  <span class="dropdown__menu-link-text"
                    >Support een ondernemer</span
                  >
                </router-link>
              </li>
              <li class="dropdown__menu-item py-3">
                <router-link :to="routes.entrepreneur">
                  <b-icon-credit-card
                    font-scale="2"
                    class="dropdown__menu-link-icon"
                  ></b-icon-credit-card>

                  <span class="dropdown__menu-link-text"
                    >Schrijf je in als ondernemer</span
                  >
                </router-link>
              </li>

              <li class="dropdown__menu-item pb-3 py-3">
                <router-link :to="routes.signin">
                  <b-icon-box-arrow-right
                    font-scale="2"
                    class="dropdown__menu-link-icon"
                  ></b-icon-box-arrow-right>
                  <span class="dropdown__menu-link-text">Log in</span>
                </router-link>
              </li>

              <li class="dropdown__menu-item py-3 ml-5">
                <div class="dropdown__menu-link-text--small text-left">
                  <router-link :to="routes.termsAndConditions"
                    >Terms and conditions</router-link
                  >
                </div>
              </li>
              <li class="dropdown__menu-item py-3 ml-5">
                <div class="dropdown__menu-link-text--small text-left">
                  <router-link :to="routes.termsAndConditions"
                    >Privacy statement</router-link
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
import { routes } from '@router/routes'

export default {
  name: 'Nav',
  data: () => {
    return {
      showNav: false,
      routes: routes,
    }
  },
}
</script>

<style lang="scss">
.header__nav {
  z-index: 2;
}
.header__navbar {
  list-style-type: none;
}
.header__icon > button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  background-color: transparent;
  border: 0;
}
.dropdown__menu-item > a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: red !important;
}
.dropdown__menu-link-text {
  margin-left: 1.5rem;
  font-size: 2rem;
  color: #000;
  &--small > a,
  &--small > a:visited {
    font-size: 1.5rem;
    color: grey !important;
  }
}
.dropdown__menu-item > a:visited {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: red !important;
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
  transform: translateX(100px);
}
.slide-fade-leave-active {
  transform: translateX(100px);
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
