import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/AccountLogin.vue';
import Register from '../views/AccountRegister.vue';
import Courses from '../views/admin/CoursesView.vue';
import EditCourse from '../views/admin/EditCourse.vue';
import { currentUserPromise } from '../firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/admin/courses',
        name: 'courses',
        component: Courses,
    },
    {
        path: '/admin/edit',
        name: 'editCourse',
        component: EditCourse,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.auth;
    const user = await currentUserPromise();

    if (requireAuth) {
        if (user) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
