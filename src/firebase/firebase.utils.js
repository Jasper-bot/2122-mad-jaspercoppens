import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

// const firebaseConfig = {
//     apiKey: "AIzaSyAKqeNsoYaPaJNEWIbQzZz-v0X3DitNPgk",
//     authDomain: "brechts-kookboek.firebaseapp.com",
//     projectId: "brechts-kookboek",
//     storageBucket: "brechts-kookboek.appspot.com",
//     messagingSenderId: "887348437539",
//     appId: "1:887348437539:web:b55d30dc7baa32025f4796",
//     measurementId: "G-2WL32M36SF"
// };

export const auth = app.auth();
export const db = app.firestore();
// export default app