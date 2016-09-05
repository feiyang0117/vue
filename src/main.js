import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import NewsView from './components/NewsView.vue'
import Ajax from 'vue-resource'
import Login from './components/login.vue'

// install routes
Vue.use(Router);
Vue.use(Ajax);

// routing
var router = new Router();
window.router = router;

router.map({
    '/news': {
        component: NewsView
    },
    '/login' : {
        component: Login
    }
});

router.beforeEach(function () {
    window.scrollTo(0, 0)
});

router.redirect({
    '*': '/login'
});

router.start(App, '#app');
