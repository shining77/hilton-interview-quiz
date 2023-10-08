import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'

import './styles.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$gqlQuery = (gql = '') => {
  const url = `/graphql?query=${encodeURIComponent(gql)}`;
  return globalThis.fetch(url).then(res => res.json());
};
Vue.prototype.$gqlMutation = (gql = '') => {
  const url = `/graphql`;
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: gql}),
    };
  return globalThis.fetch(url, options).then(res => res.json());
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
