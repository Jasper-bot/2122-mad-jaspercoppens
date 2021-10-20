import { IonContent, IonPage } from '@ionic/react';
import React from "react";

const NotFoundPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                page not found
            </IonContent>
        </IonPage>
    );
};

export default NotFoundPage;
