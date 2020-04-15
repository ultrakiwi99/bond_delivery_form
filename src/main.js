import Vue from 'vue';
import App from './App.vue';
import router from './router'
import Api from "@/components/Api/Api";

Vue.config.productionTip = false;

Vue.prototype.$api = new Api();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
