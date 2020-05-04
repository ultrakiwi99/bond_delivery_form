import Vue from 'vue';
import App from './App.vue';
import router from './router'
import Api from "@/components/Api/Api";
import store from './store'
import VueMask from "v-mask";

Vue.config.productionTip = false;

Vue.prototype.$api = new Api();

Vue.use(VueMask);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
