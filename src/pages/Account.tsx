import {IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar} from '@ionic/react';
import styles from "./Account.module.css";
import React from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";

const Account: React.FC = () => {
    const { userName } = useAuth();
    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle>Welcome {userName}</IonTitle>
                <IonButton fill="clear" color="dark" className={styles.logout}
                    onClick={() => auth.signOut()}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Account;
