import {IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar} from '@ionic/react';
import styles from "./Profile.module.css";
import React from "react";
import { auth } from '../firebase/firebase.utils.js';

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
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

export default Profile;
