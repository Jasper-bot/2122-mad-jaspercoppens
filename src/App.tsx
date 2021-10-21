//<editor-fold desc="imports">

import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import AppTabs from "./AppTabs";
import {auth} from "./firebase/firebase.utils.js";

/* Import Components */
import {IonApp, IonLoading} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Import Pages */
import Register from "./pages/register";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

import {AuthContext} from "./auth";

//</editor-fold>

const App: React.FC = () => {
    const [authState, setAuthState] = useState({loading: true, loggedIn: false});
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setAuthState({loading: false, loggedIn: Boolean(user)});
        });
    }, []);
    console.log(`authstate is:`, authState);
    if(authState.loading) {
        return <IonLoading isOpen />
    }
    return (
        <IonApp>
            <AuthContext.Provider value={{loggedIn: authState.loggedIn}}>
                {/* routes */}
                <IonReactRouter>
                    <Switch>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/my">
                            <AppTabs/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/login"/>
                        </Route>
                        <Route>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </IonReactRouter>
            </AuthContext.Provider>
        </IonApp>
    );
};

export default App;