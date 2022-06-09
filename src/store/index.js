import Vue from 'vue';
import Vuex from 'vuex';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    getters: {},
    state: {
        courses: [],
    },
    mutations: {
        GET_COURSES(state, payload) {
            state.courses = payload;
        },
    },
    actions: {
        async get_courses({ commit }) {
            console.log('por aca');

            try {
                const q = query(collection(db, 'courses'));

                onSnapshot(q, (querySnapshot) => {
                    const courses = [];
                    querySnapshot.forEach((doc) => {
                        courses.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });

                    console.log(courses);
                    commit('GET_COURSES', courses);
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
});
