import React, {useState} from "react";
import {
    IonButton,
    IonContent, IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonLoading,
    IonPage, IonRouterLink, IonRow, IonText
} from "@ionic/react";

import styles from './Login.module.css';
import RegisterHeader from '../components/RegisterHeader';

import { auth } from '../firebase/firebase.utils.js';
import {Redirect} from "react-router-dom";
import { useAuth } from "../auth";

const Login: React.FC = ({  }) => {
    const { loggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setstatus] = useState({loading: false, error: false});

    const handleLogin = async () => {
        try {
            setstatus({loading: true, error: false});
            await auth.signInWithEmailAndPassword(email, password);
        } catch(error) {
            setstatus({loading: false, error: true});
        }

    }
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
                        {status.error &&
                            <IonText color="danger">Ongeldige login gegevens</IonText>
                        }
                        <IonLabel position={"stacked"}>Email</IonLabel>
                        <IonInput type={"email"} value={email}
                            onIonChange={(event) => setEmail(event.detail.value)}
                        />
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Password</IonLabel>
                        <IonInput type={"password"} value={password}
                            onIonChange={(event) => setPassword(event.detail.value)}
                        />
                    </IonItem>
                </IonList>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonButton onClick={handleLogin}>Login</IonButton>
                        <IonLoading isOpen={status.loading}/>
                    </IonRow>
                    <IonRow  class="ion-justify-content-center">
                        <IonRow  class="ion-justify-content-center" className={styles.row}>
                            <IonRouterLink routerLink="/register" className={styles.login}>Of Registreer</IonRouterLink>
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;