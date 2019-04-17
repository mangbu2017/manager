import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import VueLoading from 'vue-loading-template';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.use(VueLoading);
Vue.use(VueRouter);
Vue.use(iView);

const RouterConfig = {
    mode: 'history',
    routes: Routers,
}

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach(route => {
    iView.LoadingBar.finish();
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
