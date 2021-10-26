import {IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar} from '@ionic/react';
import styles from "./Account.module.css";
import React from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";

const Account: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonButton fill="clear" color="dark" className={styles.logout}
                    onClick={() => auth.signOut()}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Account;
