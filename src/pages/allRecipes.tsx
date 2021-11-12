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

const AllRecipes: React.FC = () => {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // als values in deps param veranderen wordt deze functie uitgevoerd + bij startup pagina
    useEffect(() => {
        const recipesRef = db.collection('recipes');
        return recipesRef.onSnapshot(({ docs }) => setRecipes(docs.map(toRecipe)));
        }, [userId]);
    useEffect(() => {

    }, recipes)

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle className="ion-padding">Alle Recepten</IonTitle>
                {recipes.map((entry) =>
                <IonCard routerLink={`/my/recipes/view/${entry.id}`} key={entry.id}>
                    <img src={entry.imagePath} alt={entry.title}/>
                    <IonCardHeader>
                        <IonCardSubtitle>{entry.uploaderName}</IonCardSubtitle>
                        <IonCardTitle>{entry.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{entry.description}</IonCardContent>
                </IonCard>)}
            </IonContent>
        </IonPage>
    );
};

export default AllRecipes;