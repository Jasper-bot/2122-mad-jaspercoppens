// imports
import React, {useContext, useEffect, useState} from 'react';
import {auth as firebaseAuth}  from "./firebase/firebase.utils";
import { db } from "./firebase/firebase.utils";

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

// gebruikt door App.tsx om firebasegebruiker op te halen
export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            if(firebaseUser){
                read(firebaseUser.uid).then((user) => {
                    console.log("user: ",user);
                    setAuthInit({
                        loading: false,
                        auth:  {
                            loggedIn: true,
                            userId: firebaseUser.uid,
                            userName: user.username,
                            favoriteRecipes: user.favoriteRecipes,
                            badges: user.badges
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