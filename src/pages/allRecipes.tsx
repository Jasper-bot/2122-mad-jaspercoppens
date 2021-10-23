import {IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './allRecipes.css';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {Recipe, toRecipe} from "../models/recipe";

const AllRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // als values in deps param veranderen wordt deze functie uitgevoerd + bij startup pagina
    useEffect(() => {
        const recipesRef = db.collection('recipes');
        recipesRef.get().then(({docs}) =>  setRecipes(docs.map(toRecipe)));
        }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">All recipes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {recipes.map((entry) =>
                    <IonItem button key={entry.id}
                    routerLink={`/my/recipes/${entry.id}`}>
                        {entry.title}
                    </IonItem>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default AllRecipes;
