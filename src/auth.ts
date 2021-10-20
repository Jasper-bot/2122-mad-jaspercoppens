import React, {useContext} from 'react';

export const AuthContext = React.createContext({loggedIn: false});

export function useAuth() {
    return useContext(AuthContext);
}