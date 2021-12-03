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

const YourRecipes: React.FC = () => {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const recipesRef = db.collection('recipes').where("userId", "==", userId);
        return recipesRef.onSnapshot(({ docs }) => setRecipes(docs.map(toRecipe)));
    }, [userId]);

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle className="ion-padding">Uw Recepten</IonTitle>
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

export default YourRecipes;