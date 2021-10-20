import React, {useContext} from "react";
import {
    IonButton,
    IonContent, IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage, IonRouterLink, IonRow
} from "@ionic/react";

import styles from './Login.module.css';
import RegisterHeader from '../components/RegisterHeader';

import { auth } from '../firebase/firebase.utils.js';
import {Redirect} from "react-router-dom";
import { useAuth } from "../auth";

interface Props {
    onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin}) => {
    const { loggedIn } = useAuth();
    // const login = async () => {
    //     const credential = await auth.signInWithEmailAndPassword('jasper.coppens12@gmail.com', 'testwachtwoord');
    //     console.log('cred:', credential);
    // }
    if (loggedIn) {
        return <Redirect to="/my/home"/>;
    }
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
                        <IonButton onClick={onLogin}>Login</IonButton>
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