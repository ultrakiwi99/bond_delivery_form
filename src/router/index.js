import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from "@/components/Menu";
import CheckoutPaymentSuccess from "@/components/Checkout/CheckoutPaymentSuccess";
import CheckoutPaymentError from "@/components/Checkout/CheckoutPaymentError";

Vue.use(VueRouter);

const routes = [
  {
    path: '/*',
    name: 'Home',
    component: Menu,
    props: true
  },
  {
    path: '/payment_success',
    name: 'CheckoutPaymentSuccess',
    component: CheckoutPaymentSuccess,
    props: true
  },
  {
    path: '/payment_error',
    name: 'CheckoutPaymentError',
    component: CheckoutPaymentError,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router
