<template>
    <div>
        <v-container>
            <v-row justify="center" class="mt-4">
                <h1>Editando el curso:{{ name }}</h1>
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
                        v-model="url"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Cupos del curso"
                        v-model.number="availableSpots"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Inscritos enel curso"
                        v-model.number="registeredUsers"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Duración del curso"
                        v-model.number="courseLength"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Costo del curso"
                        v-model.number="price"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Código del curso"
                        v-model.number="courseCode"
                        required
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
                <v-col cols="12">
                    <v-menu
                        ref="menu"
                        v-model="date"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="datetime"
                                label="Fecha de Registro"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="datetime" no-title scrollable>
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
                    <v-btn class="mr-4" color="success" @click="saveForm">
                        ACTUALIZAR
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        LIMPIAR FORMULARIO
                    </v-btn>

                    <v-btn
                        color="warning"
                        class="mr-4"
                        @click="resetValidation"
                    >
                        LIMPIAR VALIDACIÓN
                    </v-btn>
                    <v-btn color="primary" @click="back"> REGRESAR </v-btn>
                </v-col>
                <v-col cols="12">
                    <div class="finished">
                        <v-switch
                            v-model="finished"
                            flat
                            :label="`Terminado: ${finished.toString()}`"
                        ></v-switch>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
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
            datetime: new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10),
            date: '',
            description: '',
            name: '',
            price: '',
            registeredUsers: 0,
            availableSpots: 0,
            url: '',
            id: '',
            menu: false,
            modal: false,
            menu2: false,
        };
    },
    methods: {
        ...mapActions(['update_course']),

        goToCreation() {
            this.$router.push('/');
        },
        saveForm() {
            var myDate = new Date(this.datetime);
            myDate.setDate(myDate.getDate() + 1);
            console.log(myDate);

            this.update_course(
                {
                    id: this.$route.params.id,
                    finished: this.finished,
                    courseCode: this.courseCode,
                    courseLength: this.courseLength,
                    date: myDate,
                    description: this.description,
                    name: this.name,
                    price: this.price,
                    registeredUsers: this.registeredUsers,
                    url: this.url,
                    availableSpots: this.availableSpots,
                },
                this.id
            );

            this.$router.go(-1);
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
                    this.availableSpots = docSnap.data().availableSpots;
                }
            } catch (error) {
                console.log(error);
            }
        },
        reset() {
            this.$refs.EditCourse.reset();
        },
        resetValidation() {
            this.$refs.EditCourse.resetValidation();
        },
        back() {
            this.$router.push({ name: 'courses' });
        },
    },
    mounted() {
        this.id = this.$route.params.id;
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
