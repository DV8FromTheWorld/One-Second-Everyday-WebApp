import Vue from 'vue'

import App     from './App'
import router  from './plugins/router'
import vuetify from './plugins/vuetify'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// https://github.com/vuetifyjs/vuetify/issues/9999
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  vuetify,
  template: '<App/>'
}).$mount('#app')
