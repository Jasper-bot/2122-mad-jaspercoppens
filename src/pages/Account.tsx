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
import React, {useEffect, useState} from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";
import {moon} from "ionicons/icons";

const Account: React.FC = () => {
    const { userName, userId, badges } = useAuth();

    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };

    useEffect(() => {
        console.log(badges);
    }, [userId, badges]);

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle>Welcome {userName}</IonTitle>
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
