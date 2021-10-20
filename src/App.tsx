//<editor-fold desc="imports">

import React, {useState} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import AppTabs from "./AppTabs";

/* Import Components */
import {IonApp} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Import Pages */
import Register from "./pages/register";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

import { AuthContext} from "./auth";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import  '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//</editor-fold>

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      <IonApp>
        <AuthContext.Provider value={{ loggedIn }}>
        {/* routes */}
        <IonReactRouter>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                    <Login
                        onLogin={() => setLoggedIn(true)}
                    />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
        </IonReactRouter>
        </AuthContext.Provider>
      </IonApp>
  );
};

export default App;