<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap align-center justify-center>
            <v-flex v-for="item in courses" :key="item.id" xs12 md6 lg3>
                <v-card class="mx-auto my-12 mr-4" max-width="374">
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-img height="250" v-bind:src="item.url"></v-img>

                    <v-card-title>{{ item.name }}</v-card-title>

                    <v-stepper vertical class="stepper">
                        Información
                        <v-stepper-step step="1" color="purple">
                            <small>Costo: {{ item.price }}</small>
                            <small
                                >Duración: {{ item.courseLength }} meses</small
                            >
                        </v-stepper-step>

                        <v-stepper-content step="1"> </v-stepper-content>

                        <v-stepper-step step="2" color="green">
                            <small>Cupos: {{ item.availableSpots }}</small>
                            <small>Completado: {{ item.active }}</small>
                        </v-stepper-step>

                        <v-stepper-content step="2">
                            <v-card
                                color="grey lighten-1"
                                class="mb-12"
                                height="200px"
                            ></v-card>
                            <v-btn color="primary"> Continue </v-btn>
                            <v-btn text> Cancel </v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="3">
                            <small>Fecha de Registro</small>
                            <small></small>
                        </v-stepper-step>

                        <v-stepper-content step="3">
                            <v-card
                                color="grey lighten-1"
                                class="mb-12"
                                height="200px"
                            ></v-card>
                            <v-btn color="primary"> Continue </v-btn>
                            <v-btn text> Cancel </v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="4">
                            <small>Descripción</small>
                            <small>{{ item.description }}</small>
                        </v-stepper-step>
                        <v-stepper-content step="4">
                            <v-card
                                color="grey lighten-1"
                                class="mb-12"
                                height="200px"
                            ></v-card>
                            <v-btn color="primary"> Continue </v-btn>
                            <v-btn text> Cancel </v-btn>
                        </v-stepper-content>
                    </v-stepper>

                    <v-card-actions> </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            courses: [],
        };
    },
    methods: {
        async loadCourses() {
            const q = query(collection(db, 'courses'));

            onSnapshot(q, (querySnapshot) => {
                const desserts = [];
                querySnapshot.forEach((doc) => {
                    desserts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                console.log(desserts);
                this.courses = desserts;
            });
        },
    },
    mounted() {
        console.log(db);
        this.loadCourses();
    },
};
</script>
<style scoped>
.stepper {
    background: lightgray;
}
</style>
