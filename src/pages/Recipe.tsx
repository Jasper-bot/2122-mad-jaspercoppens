import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";

interface RouteParams {
    id: string;
}

const Recipe: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [recipe, setRecipe] = useState<any>();
    useEffect(() => {
        const recipeRef = db.collection('recipes').doc(id);
        recipeRef.get().then ((doc) => {
            const recipe = { id: doc.id, ...doc.data()}
            setRecipe(recipe);
        });
    }, [id]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{recipe?.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{recipe?.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>{recipe?.description}</p>
            </IonContent>
        </IonPage>
    );
};

export default Recipe;