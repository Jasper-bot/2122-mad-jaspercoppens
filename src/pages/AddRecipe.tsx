import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonRow, IonTextarea
} from '@ionic/react';
import React, {useState} from "react";
import Header from "../components/Header";
import { db } from '../firebase/firebase.utils';
import {useAuth} from "../auth";
import {useHistory} from "react-router";

const AddRecipe: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {userId}  = useAuth();
    const history = useHistory();

    const handleAddRecipe = () => {
        const uploaderId = userId;
        const recipesRef = db.collection('recipes');
        const recipeData = { title, description, uploaderId};
        recipesRef.add(recipeData);
        history.goBack();
    }

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent class="ion-padding">
                <IonList>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Title</IonLabel>
                        <IonInput value={title}
                            onIonChange={(event) => setTitle(event.detail.value)}/>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Description</IonLabel>
                        <IonTextarea value={description}
                            onIonChange={(event) => setDescription(event.detail.value)}/>
                    </IonItem>
                </IonList>
                <IonRow class="ion-justify-content-center">
                    <IonButton onClick={handleAddRecipe}>Voeg toe</IonButton>
                    {/*<IonLoading/>*/}
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default AddRecipe;