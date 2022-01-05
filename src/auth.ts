// imports
import React, {useContext, useEffect, useState} from 'react';
import {auth as firebaseAuth, db} from "./firebase/firebase.utils";
import {User} from "./models/user";

// interfaces
interface Auth {
    loggedIn: boolean;
    userId?: string;
    userName?: string;
    favoriteRecipes?: string[];
    badges?:{Dessert: [], Veggie:[], Vis:[], Vlees:[]};
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
                console.log('firebaseUser',firebaseUser);
                read(firebaseUser.uid).then((data ) => {
                    if(data){
                        setAuthInit({
                            loading: false,
                            auth:  {
                                loggedIn: true,
                                userId: firebaseUser.uid,
                                userName: data.username,
                                favoriteRecipes: data.favoriteRecipes,
                                badges: data.badges
                            }});
                    } else {
                        setAuthInit({loading: false, auth: {loggedIn: false}})
                    }
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