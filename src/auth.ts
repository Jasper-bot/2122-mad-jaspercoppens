// imports
import React, {useContext, useEffect, useState} from 'react';
import {auth as firebaseAuth}  from "./firebase/firebase.utils";

// interfaces
interface Auth {
    loggedIn: boolean;
    userId?: string;
    userName?: string;
}

interface AuthInit{
    loading: boolean;
    auth?: Auth;
    userName?: string;
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