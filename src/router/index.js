import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from "@/components/Menu";
import PaymentSuccess from "@/components/Payment/PaymentSuccess";
import PaymentFailed from "@/components/Payment/PaymentFailed";

Vue.use(VueRouter);

const routes = [
  {
    path: '/payment_success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
    props: true
  },
  {
    path: '/payment_failed',
    name: 'PaymentFailed',
    component: PaymentFailed,
    props: true
  },
  {
    path: '/',
    name: 'Home',
    component: Menu,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router
