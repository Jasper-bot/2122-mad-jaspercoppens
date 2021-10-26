import { IonContent, IonHeader, IonPage} from '@ionic/react';
import React from "react";
import Header from "../components/Header";

const AddRecipe: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    );
};

export default AddRecipe;
