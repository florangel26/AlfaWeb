<template>
    <v-row justify="center" class="mt-4">
        <h1>Administración</h1>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
                            <div id="formOptions">
                                <v-btn
                                    color="success"
                                    class="mr-4"
                                    :click="this.saveForm()"
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
export default {
    name: 'AddCourse',
    components: {},
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        goToCreation() {
            this.$router.push('/');
        },
        saveForm() {
            this.dialog = false;
        },
    },
};
</script>
<style scoped></style>
