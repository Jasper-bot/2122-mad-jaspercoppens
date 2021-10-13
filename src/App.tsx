import React from "react";
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, book, bag, heart } from 'ionicons/icons';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import YourRecipes from './pages/yourRecipes';
import AllRecipes from './pages/allRecipes';

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

const App: React.FC = () => (
  <IonApp>

    {/* routes */}
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route path="/allRecipes">
            <AllRecipes />
          </Route>
          <Route path="/yourRecipes">
            <YourRecipes />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        {/* tabbar */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home}></IonIcon>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="allRecipes" href="/allRecipes">
            <IonIcon icon={book} />
            <IonLabel>Alle recepten</IonLabel>
          </IonTabButton>
          <IonTabButton tab="yourRecipes" href="/yourRecipes">
            <IonIcon icon={bag} />
            <IonLabel>Uw recepten</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorites" href="/favorites">
            <IonIcon icon={heart} />
            <IonLabel>Favorieten</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;