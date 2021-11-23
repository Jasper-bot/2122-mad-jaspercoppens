import {
    IonButton,
    IonContent,
    IonHeader, IonIcon,
    IonItem, IonLabel,
    IonPage,
    IonRouterLink,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import styles from "./Account.module.css";
import React from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";
import {moon} from "ionicons/icons";

const Account: React.FC = () => {
    const { userName } = useAuth();
    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };
    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle>Welcome {userName}</IonTitle>
                <IonButton color={"warning"}>tst</IonButton>
                <IonItem>
                    <IonIcon slot="start" icon={moon} />
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle
                        slot="end"
                        name="darkMode"
                        onIonChange={toggleDarkModeHandler}
                    />
                </IonItem>
                <IonButton fill="clear" color="dark" className={styles.logout}
                    onClick={() => auth.signOut()}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Account;
