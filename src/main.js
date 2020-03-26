import Vue from 'vue'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import router from './router'

import App from './App.vue'
// Globally register all `_base`-prefixed components
import '@components/_globals'
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.VUE_APP_REGION,
    userPoolId: process.env.VUE_APP_POOL_ID,
    identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_CLIENT_ID,
  },
})
Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: '34c97fb7-5afa-4077-b608-47b0cfd02394',
  },
})
appInsights.loadAppInsights()
appInsights.trackPageView() // Manually call trackPageView to establish the current user/session/pageview

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
