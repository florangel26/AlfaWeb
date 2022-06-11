<template>
    <div>
        <v-container>
            <add-course />
            <v-row>
                <v-col cols="12" md="12">
                    <v-data-table
                        :headers="headers"
                        :items="courses"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                        <template v-slot:[`item.price`]="{ item }">
                            <v-chip :color="getColor()" dark>
                                {{ formatPrice(item.price) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.active`]="{ item }">
                            <v-chip :color="getFinishedColor(item.active)" dark>
                                {{ formatFinished(item.active) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.date`]="{ item }">
                            <v-chip :color="getColor()" dark>
                                {{ formatDate(item.date) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="goToEdit(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary"> Reset </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <br />
            <br />

            <v-alert dense outlined color="purple" icon="mdi-account-group">
                Cantidad total de alumnos permitidos:
                <strong> {{ totalAlumnos }}</strong>
                alumnos
            </v-alert>

            <v-alert
                dense
                outlined
                color="blue"
                icon="mdi-account-multiple-check"
            >
                Cantidad total de alumnos inscritos:
                <strong> {{ totalInscritos }}</strong>
                alumnos
            </v-alert>

            <v-alert dense outlined color="red" icon="mdi-account-clock">
                Cantidad total de cupos restantes:
                <strong> {{ totalRestantes }} </strong>
                alumnos
            </v-alert>

            <v-alert dense outlined color="pink" icon="mdi-block-helper">
                Cantidad total de cursos terminados: 4
                <strong> {{ totalCursosCompletos }}</strong>
                cursos
            </v-alert>

            <v-alert dense outlined color="brown" icon="mdi-bell-ring">
                Cantidad total de cursos activos: 2
                <strong> {{ totalCursosCompletos }}</strong>
                cursos
            </v-alert>

            <v-alert dense outlined color="deep-orange" icon="mdi-bell-ring">
                Cantidad total de cursos:
                <strong> {{ totalCursos }}</strong>
                cursos
            </v-alert>
        </v-container>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title>
                    De verdad quieres borrar el registro?
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        No
                    </v-btn>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="delete_current_course()"
                    >
                        Si
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddCourse from '@/components/admin/AddCourse.vue';
import { db } from '../../firebase';
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
} from 'firebase/firestore';
import moment from 'moment';

export default {
    data() {
        return {
            headers: [
                {
                    text: 'Curso',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                    completed: false,
                },
                { text: 'Cupos', value: 'availableSpots' },
                { text: 'Inscritos', value: 'registeredUsers' },
                { text: 'Duración', value: 'courseLength' },
                { text: 'Costo', value: 'price' },
                { text: 'Terminado', value: 'active' },
                { text: 'Fecha', value: 'date' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            id: 0,
            dialog: false,
        };
    },
    methods: {
        ...mapActions(['get_courses', 'delete_course']),

        getColor() {
            return 'green';
        },
        getFinishedColor(value) {
            if (value) return 'blue';
            else return 'gray';
        },
        goToEdit(item) {
            //console.log(item);
            this.$router.push('/admin/edit/' + item.id);
        },
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

                //console.log(desserts);
                this.courses = desserts;
            });
        },
        async delete_current_course() {
            try {
                await this.delete_course(this.id);
                this.get_courses();
                this.dialog = false;
            } catch (error) {
                console.log(error);
                this.dialog = false;
            }
        },

        async update_dessert(dessert) {
            try {
                const docRef = doc(db, 'courses', this.id);
                await updateDoc(docRef, {
                    name: dessert.name,
                    calories: dessert.calories,
                });
            } catch (error) {
                console.log(error);
            }
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        formatFinished(value) {
            if (!value) return 'Si';
            else return 'No';
        },
        formatDate(value) {
            //console.log(value.seconds);
            return moment.unix(value.seconds).format('DD/MM/YYYY');
        },
        deleteItem(item) {
            console.log(item);
            this.id = item.id;
            this.dialog = true;
        },
    },
    computed: {
        ...mapState(['courses']),
        totalAlumnos() {
            return this.courses.reduce(
                (acc, current) => acc + +current.availableSpots,
                0
            );
        },

        totalInscritos() {
            const totaListInscritos = this.courses.reduce(
                (acc, current) => acc + +current.registeredUsers,
                0
            );
            return totaListInscritos;
        },
        totalRestantes() {
            return this.totalAlumnos - this.totalInscritos;
        },
        totalCursos() {
            return this.courses.length;
        },

        totalNoTerminado() {
            let uncompletedCourses = this.courses;
            uncompletedCourses = uncompletedCourses.filter((item) => {
                return item.courseLength === 'completed';
            });
            return uncompletedCourses;
        },
        totalCursosCompletos() {
            return this.$store.getters.completedCoursesCount;
        },
    },
    components: {
        AddCourse,
    },
    mounted() {
        //this.loadCourses();
        this.get_courses();
    },
};
</script>
