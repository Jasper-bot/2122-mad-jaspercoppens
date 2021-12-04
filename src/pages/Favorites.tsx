import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
} from '@ionic/react';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {Recipe, toRecipe} from "../models/recipe";
import Header from "../components/Header";
import {useAuth} from "../auth";

const Favorites: React.FC = () => {
    const { userId, favoriteRecipes } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        const recipesRef = db.collection('recipes');
        favoriteRecipes.forEach( el => {
            let recipeRef = recipesRef.doc(el);
            recipeRef.get().then ((doc) => {
                setRecipes(arr => [...arr, toRecipe(doc)]);
            });
        })
    }, [userId, favoriteRecipes]);

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle className="ion-padding">Favoriete Recepten</IonTitle>
                {recipes.map((entry) =>
                    <IonCard routerLink={`/my/recipes/view/${entry.id}`} key={entry.id}>
                        <img src={entry.photo} alt={entry.title}/>
                        <IonCardHeader>
                            <IonCardSubtitle>{entry.userName}</IonCardSubtitle>
                            <IonCardTitle>{entry.title}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>{entry.description}</IonCardContent>
                    </IonCard>)}
            </IonContent>
        </IonPage>
    );
};

export default Favorites;