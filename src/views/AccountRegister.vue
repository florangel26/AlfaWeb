<template>
    <v-container>
        <v-row justify="space-between">
            <v-col cols="12">
                <h1>Registro de Usuario</h1>
            </v-col>
            <v-col cols="12">
                <v-form v-model="valid" ref="formRegister">
                    <v-text-field
                        v-model="email"
                        :rules="this.emailRules"
                        label="Email"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :rules="this.passwordRules"
                        label="Password"
                    ></v-text-field>
                    <div id="formOptions">
                        <v-btn
                            color="success"
                            class="mr-4"
                            :disabled="!valid"
                            @click="register"
                        >
                            Iniciar
                        </v-btn>
                        <v-btn color="error" class="mr-4">
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default {
    name: 'AccountRegister',
    components: {},
    data() {
        return {
            email: '',
            password: '',
            valid: false,
            emailRules: [
                (v) => (v && !!v.trim()) || 'Escribe algo, no espacios!',
                (v) => !!v || 'No existe',
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    'Formato de email incorrecto',
            ],
            passwordRules: [
                (v) => (v && v.length > 5) || 'Contraseña sobre 6 carácteres',
                (v) => !!v || 'No existe',
            ],
        };
    },
    methods: {
        register() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    alert('Registrado correctamente!');
                    this.$router.push('/login');
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
    },
};
</script>
<style scoped>
#formOptions {
    text-align: center;
}
</style>
