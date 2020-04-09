import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { I18n } from '@aws-amplify/core'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'

import router from './router'
import { routes } from './router/routes'
import { dictAwsAmplifyNl } from './i18n/aws_amplify.nl'
import { AuthStateValue } from './views/constants'

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
})
AmplifyEventBus.$on('authState', async (state) => {
  switch (state) {
    case AuthStateValue.SIGNED_OUT:
      router.push({ path: routes.home })
      break
    case AuthStateValue.SIGNED_IN:
      router.push({ path: routes.entrepreneur })
      break

    default:
      break
  }
})
Vue.use(AmplifyPlugin, AmplifyModules)
// It's important to instantiate the Vue instance after calling Vue.use!

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
