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
                        <template v-slot:[`item.calories`]="{ item }">
                            <v-chip :color="getColor(item.calories)" dark>
                                {{ item.calories }}
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
                            <v-btn color="primary" @click="initialize">
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import AddCourse from '@/components/admin/AddCourse.vue';

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
                { text: 'Cupos', value: 'calories' },
                { text: 'Inscritos', value: 'fat' },
                { text: 'Duración', value: 'carbs' },
                { text: 'Costo', value: 'protein' },
                { text: 'Terminado', value: 'iron' },
                { text: 'Fecha', value: 'iron' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            courses: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        };
    },
    methods: {
        getColor(calories) {
            if (calories > 400) return 'red';
            else if (calories > 200) return 'orange';
            else return 'green';
        },
        goToEdit(item) {
            console.log(item);
            this.$router.push('/admin/edit');
        },
    },
    components: {
        AddCourse,
    },
};
</script>
