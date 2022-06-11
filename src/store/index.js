import Vue from 'vue';
import Vuex from 'vuex';
import {
    collection,
    onSnapshot,
    query,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        courses: [],
        getters: {
            completedCourses(state) {
                return state.courses.filter((course) => course.completed);
            },
            completedCoursesCount(state, getters) {
                return getters.completedCourses.length;
            },
        },
    },
    mutations: {
        UPDATE_COURSE(state, payload) {
            state.courses = state.courses.map((item) =>
                item.id === payload.id ? payload : item
            );
        },
        GET_COURSES(state, payload) {
            state.courses = payload;
        },
        DELETE_COURSE(state, payload) {
            state.courses = state.courses.filter((item) => item.id !== payload);
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
        async update_course(state, course) {
            try {
                const docRef = doc(db, 'courses', course.id);

                await updateDoc(docRef, {
                    courseCode: course.courseCode,
                    courseLength: course.courseLength,
                    date: course.date,
                    description: course.description,
                    name: course.name,
                    price: course.price,
                    registeredUsers: course.registeredUsers,
                    url: course.url,
                });
            } catch (error) {
                console.log(error);
            }
        },
        async delete_course(state, id) {
            try {
                console.log('Borrando');
                console.log(id);
                const docRef = doc(db, 'courses', id);
                await deleteDoc(docRef);
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
});
