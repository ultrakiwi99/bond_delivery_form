import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from "@/components/Menu";

Vue.use(VueRouter);

const routes = [
  {
    path: '/*',
    name: 'Home',
    component: Menu,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router
