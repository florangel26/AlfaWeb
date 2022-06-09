<template>
    <v-row justify="center" class="mt-4">
        <h1>Administración</h1>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="ml-5"
                >
                    Agregar curso
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Agregando curso</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Nombre"
                                    required
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="URL de la Imagen del Curso"
                                    required
                                    v-model="url"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Cupos del curso"
                                    type="number"
                                    v-model.number="availableSpots"
                                    :rules="textRules"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Inscritos en el curso"
                                    type="number"
                                    v-model.number="registeredUsers"
                                    :rules="textRules"
                                    required
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Duración del curso"
                                    required
                                    v-model="courseLength"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Costo del curso"
                                    type="number"
                                    v-model="price"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Código del curso"
                                    required
                                    v-model="courseCode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    solo
                                    name="input-7-4"
                                    label="Descripción del curso"
                                    v-model="description"
                                ></v-textarea>
                            </v-col>
                            <div id="formOptions">
                                <v-btn
                                    color="success"
                                    class="mr-4"
                                    @click="saveForm()"
                                >
                                    Agregar
                                </v-btn>
                                <v-btn color="error" class="mr-4">
                                    Limpiar Formulario
                                </v-btn>
                                <v-btn color="warning">
                                    Limpiar Validación
                                </v-btn>
                            </div>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
export default {
    name: 'AddCourse',
    components: {},
    data() {
        return {
            dialog: false,
            active: false,
            availableSpots: 0,
            courseCode: '',
            courseLength: '',
            date: '',
            description: '',
            name: '',
            price: '',
            registeredUsers: 0,
            url: '',
            textRules: [(v) => !!v || 'Field is required'],
            studentRules: [
                (v) => !!v || 'Field is required',
                (v) =>
                    v <= this.course.availability ||
                    'More students than available spaces',
            ],
        };
    },
    methods: {
        goToCreation() {
            this.$router.push('/');
        },
        async saveForm() {
            //dessert.id = nanoid(6);
            try {
                if (this.name == '') return;

                await addDoc(collection(db, 'courses'), {
                    active: this.active,
                    availableSpots: this.availableSpots,
                    courseCode: this.courseCode,
                    courseLength: this.courseLength,
                    date: this.date,
                    description: this.description,
                    name: this.name,
                    price: this.price,
                    registeredUsers: this.registeredUsers,
                    url: this.url,
                });

                this.dialog = false;
            } catch (error) {
                console.log(error);
            }
            // commit("ADD_DESSERT", dessert);
        },
    },
};
</script>
<style scoped></style>
