import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home.vue'

import { routes } from './routes'

Vue.use(VueRouter)

const vueRoutes = [
  {
    path: routes.home,
    name: 'Home',
    component: Home,
  },
  {
    path: routes.signup,
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "SignUp" */ '@views/SignUp.vue'),
  },
  {
    path: routes.signin,
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "SignIn" */ '@views/SignIn.vue'),
  },
  {
    path: routes.about,
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '@views/About.vue'),
  },
  {
    path: routes.entrepreneur,
    name: 'Entrepreneur',
    component: () =>
      import(/* webpackChunkName: "Entrepreneur" */ '@views/Entrepreneur.vue'),
  },
  {
    path: routes.letMeHelp,
    name: 'LetMeHelp',
    component: () =>
      import(/* webpackChunkName: "LetMeHelp" */ '@views/LetMeHelp.vue'),
  },
  {
    path: routes.termsAndConditions,
    name: 'TermsAndConditions',
    component: () =>
      import(
        /* webpackChunkName: "TermsAndConditions" */ '@views/TermsAndConditions.vue'
      ),
  },
  {
    path: routes.coupons + '/:companyId',
    name: 'Coupons',
    component: () =>
      import(/* webpackChunkName: "Coupons" */ '@views/Coupons.vue'),
  },
  {
    path: routes.couponConfirm + '/:companyId',
    name: 'CouponsConfirm',
    component: () =>
      import(
        /* webpackChunkName: "CouponConfirm" */ '@views/CouponConfirm.vue'
      ),
  },
  {
    path: routes.stripeConnect,
    name: 'StripeConnect',
    component: () =>
      import(
        /* webpackChunkName: "StripeConnect" */ '@views/StripeConnect.vue'
      ),
  },
  {
    path: routes.customer,
    name: 'CustomerLandingPage',
    component: () =>
      import(
        /* webpackChunkName: "CustomerLandingPage" */ '@views/CustomerLandingPage.vue'
      ),
  },
  {
    path: routes.privacyStatement,
    name: 'PrivacyStatement',
    component: () =>
      import(
        /* webpackChunkName: "PrivacyStatement" */ '@views/PrivacyStatement.vue'
      ),
  },
  {
    path: routes.successfulPayment,
    name: 'SuccessfulPayment',
    component: () =>
      import(
        /* webpackChunkName: "SuccessfulPayment */ '@views/SuccessfullyPayment.vue'
      ),
  },
  {
    path: routes.canceledPayment,
    name: 'CanceledPayment',
    component: () =>
      import(
        /* webpackChunkName: "CanceledPayment */ '@views/CanceledPayment.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: vueRoutes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
