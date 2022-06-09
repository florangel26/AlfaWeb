// src/firebaseInit.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCYXxTkFPWLeZE0ENdNOEPQn6y2bOETD3s',
    authDomain: 'crud-test-cacc7.firebaseapp.com',
    projectId: 'crud-test-cacc7',
    storageBucket: 'crud-test-cacc7.appspot.com',
    messagingSenderId: '262147278150',
    appId: '1:262147278150:web:2f5345fb11287b78829147',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const currentUserPromise = () =>
    new Promise((resolve, reject) => {
        onAuthStateChanged(
            auth,
            (user) => {
                resolve(user);
            },
            (e) => reject(e)
        );
    });

export { auth, currentUserPromise, db };
