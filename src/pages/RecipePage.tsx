import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Recipe, toRecipe} from "../models/recipe";

interface RouteParams {
    id: string;
}

const RecipePage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [recipe, setRecipe] = useState<Recipe>();
    useEffect(() => {
        const recipeRef = db.collection('recipes').doc(id);
        recipeRef.get().then ((doc) => setRecipe(toRecipe(doc)));
    }, [id]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{recipe?.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <p>{recipe?.description}</p>
            </IonContent>
        </IonPage>
    );
};

export default RecipePage;