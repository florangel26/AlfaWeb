<template>
    <v-card class="mx-auto my-12" max-width="374">
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-title>Javascript Avanzado</v-card-title>

        <v-stepper vertical>
            Información
            <v-stepper-step step="1" color="purple">
                <small>Costo: 3000</small>
                <small>Duración: 2 meses</small>
            </v-stepper-step>

            <v-stepper-content step="1"> </v-stepper-content>

            <v-stepper-step step="2" color="green">
                <small>Cupos: 20</small>
                <small>Completado: No</small>
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
                <small>03/03/2020</small>
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
                <small
                    >Curso con las nuevas actualizaciones de Javascript</small
                >
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

        <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: {},
};
</script>
