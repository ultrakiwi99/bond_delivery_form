import Vue from 'vue';
import App from './App.vue';
import router from './router'
import Api from "@/components/Api/Api";
import SberApi from "@/components/Api/SberApi";

Vue.config.productionTip = false;

Vue.prototype.$api = new Api();
Vue.prototype.$sber = new SberApi();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
