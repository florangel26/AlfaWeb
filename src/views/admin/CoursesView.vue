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
        </v-container>
    </div>
</template>

<script>
import AddCourse from '@/components/admin/AddCourse.vue';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
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
                },
                { text: 'Cupos', value: 'availableSpots' },
                { text: 'Inscritos', value: 'registeredUsers' },
                { text: 'Duración', value: 'courseLength' },
                { text: 'Costo', value: 'price' },
                { text: 'Terminado', value: 'active' },
                { text: 'Fecha', value: 'date' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            courses: [],
        };
    },
    methods: {
        getColor() {
            return 'green';
        },
        getFinishedColor(value) {
            if (value) return 'blue';
            else return 'gray';
        },
        goToEdit(item) {
            console.log(item);
            this.$router.push('/admin/edit');
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

                console.log(desserts);
                this.courses = desserts;
            });
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
            console.log(value.seconds);
            return moment.unix(value.seconds).format('DD/MM/YYYY');
        },
    },
    components: {
        AddCourse,
    },
    mounted() {
        console.log(db);
        this.loadCourses();
    },
};
</script>
