import React from "react";
import {
    IonButton,
    IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNav,
    IonPage, IonRouterLink, IonRow
} from "@ionic/react";

import styles from './Login.module.css';
import RegisterHeader from "../components/RegisterHeader";

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <RegisterHeader/>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonList lines="inset">
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Email</IonLabel>
                        <IonInput type={"email"}></IonInput>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Password</IonLabel>
                        <IonInput type={"password"}></IonInput>
                    </IonItem>
                </IonList>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonButton>Login</IonButton>
                    </IonRow>
                    <IonRow  class="ion-justify-content-center">
                        <IonRow  class="ion-justify-content-center" className={styles.row}>
                            <IonRouterLink routerLink="/Register" className={styles.login}>Of Registreer</IonRouterLink>
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;