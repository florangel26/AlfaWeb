<template>
    <div>
        <v-container>
            <v-row justify="center" class="mt-4">
                <h1>Editando el curso: bla bla bla</h1>
                <v-col cols="12">
                    <v-text-field
                        label="Nombre"
                        v-model="name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="URL de la Imagen del Curso"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Cupos del curso"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Inscritos enel curso"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Duración del curso"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Costo del curso"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Código del curso"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="Descripción del curso"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Fecha de Registro"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                                Cancelar
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <div class="finished">
                    <v-switch
                        v-model="finished"
                        flat
                        :label="`Terminado: ${finished.toString()}`"
                    ></v-switch>
                </div>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';

export default {
    name: 'EditCourse',
    components: {},
    data() {
        return {
            finished: false,
            courseCode: '',
            courseLength: '',
            date: '',
            description: '',
            name: '',
            price: '',
            registeredUsers: 0,
            url: '',
        };
    },
    methods: {
        goToCreation() {
            this.$router.push('/');
        },
        saveForm() {
            this.dialog = false;
        },
        async get_course(id) {
            try {
                const docSnap = await getDoc(doc(db, 'courses', id));

                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    this.id = docSnap.data().id;
                    this.courseCode = docSnap.data().courseCode;
                    this.courseLength = docSnap.data().courseLength;
                    this.date = docSnap.data().date;
                    this.description = docSnap.data().description;
                    this.name = docSnap.data().name;
                    this.price = docSnap.data().price;
                    this.registeredUsers = docSnap.data().registeredUsers;
                    this.url = docSnap.data().url;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        console.log(this.$route.params.id);
        this.get_course(this.$route.params.id);
    },
};
</script>
<style scoped>
.finished {
    text-align: left;
}
</style>
