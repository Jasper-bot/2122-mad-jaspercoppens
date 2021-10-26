//<editor-fold desc="imports">

import React from "react";
import {Redirect, Route} from 'react-router-dom';
/* Import Components */
import {
  IonIcon,
  IonLabel, IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { home, book, bag, heart } from 'ionicons/icons';

/* Import Pages */
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import YourRecipes from './pages/yourRecipes';
import AllRecipes from './pages/allRecipes';
import Account from './pages/Account';
import RecipePage from "./pages/RecipePage";

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

import {useAuth} from "./auth";
import AddRecipe from "./pages/AddRecipe";
import NotFoundPage from "./pages/NotFoundPage";


//</editor-fold>

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/my/home">
                <Home />
              </Route>
              <Route exact path="/my/favorite-recipes">
                <Favorites />
              </Route>
              <Route path="/my/recipes/view/:id">
                <RecipePage />
              </Route>
              <Route path="/my/recipes/add-recipe">
                <AddRecipe />
              </Route>
              <Route exact path="/my/recipes">
                <AllRecipes />
              </Route>
              <Route path="/my/your-recipes">
                    <YourRecipes />
              </Route>
              <Route path="/my/account">
                <Account/>
              </Route>
              <Route>
                <NotFoundPage/>
              </Route>
            </IonRouterOutlet>

            {/* tabbar */}
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/my/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="allRecipes" href="/my/recipes">
                <IonIcon icon={book} />
                <IonLabel>Alle recepten</IonLabel>
              </IonTabButton>
              <IonTabButton tab="yourRecipes" href="/my/your-recipes">
                <IonIcon icon={bag} />
                <IonLabel>Uw recepten</IonLabel>
              </IonTabButton>
              <IonTabButton tab="favorites" href="/my/favorite-recipes">
                <IonIcon icon={heart} />
                <IonLabel>Favorieten</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
  );
};

export default AppTabs;