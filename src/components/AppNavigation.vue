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
            <v-btn text class="hidden-sm-and-down" @click="drawer = !drawer"
                >Menu</v-btn
            >
            <v-toolbar-title class="AppTitle">{{ appTitle }}</v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn text class="hidden-sm-and-down" v-if="!user">INGRESAR</v-btn>
            <v-btn
                color="brown lighten-3"
                class="hidden-sm-and-down"
                v-if="!user"
                @click="goToRegister()"
                >REGISTRARTE</v-btn
            >
            <v-btn
                rounded
                color="purple darken-4"
                dark
                v-if="user"
                @click="closeSession"
            >
                Logout
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
        });
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
            this.$router.push('/admin/courses');
        },
    },
};
</script>

<style scoped>
.AppTitle {
    margin-left: 10px;
}
</style>
