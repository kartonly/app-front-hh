import Vue from 'vue';
import App from './App.vue';
import Main from "./components/Main";
import Ad from "./components/Ad";
import AddAd from "./components/AddAd";
import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/ad/:id",
    component: Ad,
  },
  {
    path: "/add",
    component: AddAd,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");