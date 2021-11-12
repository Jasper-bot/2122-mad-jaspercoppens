// imports
import React, {useContext, useEffect, useState} from 'react';
import {auth as firebaseAuth}  from "./firebase/firebase.utils";
import { db } from "./firebase/firebase.utils";

// interfaces
interface Auth {
    loggedIn: boolean;
    userId?: string;
    userName?: string;
}

interface AuthInit{
    loading: boolean;
    auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({loggedIn: false});

// hooks
// gebruikt door components om auth data te gebruiken
export function useAuth(): Auth {
    return useContext(AuthContext);
}

// gebruikt door App.tsx om firebasegebruiker op te halen
export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser?
                { loggedIn: true, userId: firebaseUser.uid} :
                { loggedIn: false};
            setAuthInit({ loading: false, auth})
        });
    }, []);
    return authInit;
}

export function useSetUsername() {
    const auth = useAuth();
    const userRef = db.collection("users").doc(auth.userId);
    userRef.get().then((doc) => {
        const user = {id: doc.id, username: doc.data().username, email: doc.data().email};
        // const newAuth = {loggedIn: true, userId: user.id, username: user.username}

        auth.userName = user.username;
    });
}

//  export async function useAuthInit() {
//     const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
//     useEffect(() => {
//         return firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
//             let username;
//             //if (firebaseUser) {
//                 //username = getUserName(firebaseUser.uid);
//                 // const fetchusername = async () => {
//                 //     const response =  await read(firebaseUser.uid);
//                 //     console.log(response);
//                 //     username = await response.json().username;
//                 // }
//                 // read(firebaseUser.uid)
//                 //     .then(result => username = result);
//                 // console.log("dit is de username in de useauthinit functie", username);
//             //}
//             username = await getUserName(firebaseUser.uid).toPromise();
//             console.log(username);
//             const auth = firebaseUser ?
//                 {loggedIn: true, userId: firebaseUser.uid, userName: username.body.userName} :
//                 {loggedIn: false};
//             setAuthInit({loading: false, auth});
//         });
//     }, []);
//     return authInit;
// }

// export function getUserName2(uid){
//     let username;
//     db.collection('users')
//         .where("id", "==" , uid)
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 console.log("1", doc.data().username);
//                 username = doc.data().username;
//             });
//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });
//     console.log(username);
//     return username;
// }

// export async function getUserName(uid){
//     let username;
//     username = db.collection('users')
//         .doc(uid)
//         .get()
//         .then((doc) => {
//             console.log(doc.data().username);
//         });
//     return username;
// }

async function read(id) {
    let data;
    await db
        .collection("users")
        .doc(id)
        .get()
        .then((docRef) => {
            data = docRef.exists ? docRef.data() : null
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    if (data === null || data === undefined) return null
    console.log("in de read functie: ", data.username);
    return data.username;
}