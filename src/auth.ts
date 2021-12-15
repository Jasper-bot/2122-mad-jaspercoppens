// imports
import React, {useContext, useEffect, useState} from 'react';
import {auth as firebaseAuth, db} from "./firebase/firebase.utils";
import {UseData} from './contexts/DataState';
import {User} from "./models/user";

// interfaces
interface Auth {
    loggedIn: boolean;
    userId?: string;
    userName?: string;
    favoriteRecipes?: string[];
    badges?;
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

let dataTest = null;

// gebruikt door App.tsx om firebasegebruiker op te halen
export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
    console.log(dataTest);
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){
                console.log(firebaseUser);
                read2(firebaseUser.uid).then((user ) => {
                    console.log('dt2',dataTest);
                    setAuthInit({
                        loading: false,
                        auth:  {
                            loggedIn: true,
                            userId: firebaseUser.uid,
                            userName: dataTest.username,
                            favoriteRecipes: dataTest.favoriteRecipes,
                            badges: dataTest.badges
                    }});
                })
            } else {
                setAuthInit({loading: false, auth: {loggedIn: false}})
            }
        });
    }, []);
    return authInit;
}

async function read(id) {
    let response = await db
        .collection("users")
        .doc(id)
        .get();
    if (response === null || response === undefined) return null;
    return response.data();
}

async function read2(id) {
    let data = useData();
    await db.collection("users")
        .doc(id)
        .onSnapshot((doc) => {
            if (doc.data() !== null || doc.data() !== undefined) {
                 dataTest =  doc.data();
                console.log('dt',dataTest);
            }
        });
}