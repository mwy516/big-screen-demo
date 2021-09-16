import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 引入amfe-flexible 自动获取页面基准值插件
import 'amfe-flexible';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
