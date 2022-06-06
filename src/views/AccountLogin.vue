<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="12">
                <h1>Login de Usuario</h1>
            </v-col>
            <v-col cols="12">
                <v-form v-model="valid" ref="formRegister">
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        :rules="passwordRules"
                    ></v-text-field>
                    <div id="formOptions">
                        <v-btn
                            color="success"
                            class="mr-4"
                            :disabled="!valid"
                            @click="loginUser"
                        >
                            Iniciar
                        </v-btn>
                        <v-btn color="error" class="mr-4" @click="reset">
                            Limpiar Formulario
                        </v-btn>
                        <v-btn color="warning"> Limpiar Validación </v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

export default {
    name: 'AccountLogin',
    components: {},
    data() {
        return {
            valid: false,
            user: {
                email: '',
                password: '',
            },
            emailRules: [
                (v) => (v && !!v.trim()) || 'Escribe algo, no espacios!',
                (v) => !!v || 'No existe',
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    'Formato de email incorrecto',
            ],
            passwordRules: [
                (v) => !!v || 'No existe',
                (v) => (v && v.length > 5) || 'Debe ser sobre 6 carácteres',
            ],
        };
    },
    methods: {
        loginUser() {
            signInWithEmailAndPassword(
                auth,
                this.user.email,
                this.user.password
            )
                .then((userCredential) => {
                    console.log(userCredential);
                    this.$router.push('/');
                })
                .catch((e) => {
                    alert('Datos Incorrectos'), console.log(e.code);
                });
        },
        reset() {
            console.log('reset...');
            this.$refs.formRegister.reset();
        },
    },
};
</script>
<style scoped>
#formOptions {
    text-align: center;
}
</style>
