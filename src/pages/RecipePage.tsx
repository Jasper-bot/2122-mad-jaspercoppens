import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonList, IonListHeader,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Recipe, toRecipe} from "../models/recipe";
import { chatbubble } from "ionicons/icons";
import Header from "../components/Header";
import styles from "./RecipePage.module.css";

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
        <IonPage >
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent class="ion-padding">
                <IonText class="ion-text-center">
                    <h2>{recipe?.title}</h2>
                    <p className={styles.uploader}>Door {recipe?.userName }</p>
                </IonText>
                <img src={recipe?.photo} alt={recipe?.title}/>
                <p>{recipe?.description}</p>
                <IonList>
                    <IonListHeader>
                        Ingrediënten
                    </IonListHeader>
                    {recipe?.ingredients.map((entry) =>
                        <IonItem key={entry.valueOf()}>
                            <IonLabel>
                                <p>
                                    {entry.valueOf()}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
                <IonListHeader>
                    Stappen
                </IonListHeader>
                <IonList>
                    {/*{recipe?.steps.forEach(())}*/}
                    {recipe?.steps.map((entry) =>
                        <IonItem key={entry.valueOf()}>
                            <IonLabel>
                                <p>
                                    {entry.valueOf()}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
                <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                    <IonFabButton>
                        <IonIcon icon={chatbubble} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default RecipePage;