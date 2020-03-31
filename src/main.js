import Vue from 'vue'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { I18n } from '@aws-amplify/core'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'

import { BootstrapVue } from 'bootstrap-vue'
import router from './router'
import { routes } from './router/routes'
import { dictAwsAmplifyNl } from './i18n/aws_amplify.nl'

import App from './App.vue'
// Globally register all `_base`-prefixed components
import '@components/_globals'

I18n.putVocabulariesForLanguage('nl', dictAwsAmplifyNl)
I18n.setLanguage('nl')

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.VUE_APP_REGION,
    userPoolId: process.env.VUE_APP_POOL_ID,
    identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_CLIENT_ID,
  },
  endpoints: [
    {
      name: 'BackendAPIDev',
      endpoint: process.env.VUE_APP_BACKEND_URL,
    },
    {
      name: 'ServerlessOffline',
      endpoint: 'http://localhost:3000/dev',
    },
  ],
})
AmplifyEventBus.$on('authState', async (state) => {
  switch (state) {
    case 'confirmSignUp':
      router.push({ path: routes.entrepreneur })
      break
    case 'signedIn':
      router.push({ path: routes.entrepreneur })
      break

    default:
      break
  }
})
Vue.use(AmplifyPlugin, AmplifyModules, BootstrapVue)
// It's important to instantiate the Vue instance after calling Vue.use!

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
