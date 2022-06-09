<template>
    <span>
        <v-overlay :value="drawer" z-index="4"> </v-overlay>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            hide-overlay
            :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
        >
            <v-list dense>
                <v-list-item @click="goToHome()"> Dashboard </v-list-item>
                <v-list-item @click="goToAdmin()"> Administración </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="purple darken-4" dark>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn
                text
                class="hidden-sm-and-down"
                @click="drawer = !drawer"
                v-if="user"
                ><v-app-bar-nav-icon></v-app-bar-nav-icon
            ></v-btn>
            <v-toolbar-title class="AppTitle">{{ appTitle }}</v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn
                color="brown lighten-3"
                class="hidden-sm-and-down mr-2"
                v-if="!user"
                @click="goToLogin()"
                >INGRESAR</v-btn
            >
            <v-btn
                color="brown lighten-3"
                class="hidden-sm-and-down"
                v-if="!user"
                @click="goToRegister()"
                >REGISTRARTE</v-btn
            >

            <h5
                v-if="user !== null"
                class="mr-2"
                style="font-weight: 300; text-transform: uppercase"
            >
                {{ user.email }}
            </h5>
            <v-btn
                rounded
                color="purple darken-4"
                dark
                v-if="user"
                @click="closeSession"
            >
                <v-icon v-if="user !== null">mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
    </span>
</template>

<script>
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Cursos AlfaWeb',
            drawer: false,
            items: [{ title: 'Menu' }, { title: 'Sign In' }, { title: 'Join' }],
            user: null,
        };
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            this.user = user;

            if (this.user == null) {
                this.$router.push('/login');
            }
        });
    },
    mounted() {
        console.log(auth.user);
    },
    methods: {
        async closeSession() {
            await signOut(auth);
            this.$router.push('/login');
        },
        goToHome() {
            this.drawer = false;
            this.$router.push('/');
        },
        goToAdmin() {
            this.drawer = false;
            this.$router.push('/admin/courses');
        },
        goToRegister() {
            this.drawer = false;
            this.$router.push('/register');
        },
        goToLogin() {
            this.drawer = false;
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.AppTitle {
    margin-left: 10px;
}
</style>
