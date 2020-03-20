import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Globally register all `_base`-prefixed components
import '@components/_globals'

Vue.config.productionTip = false

import { ApplicationInsights } from '@microsoft/applicationinsights-web'

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
