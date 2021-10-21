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

const Register: React.FC = ({  }) => {
    const { loggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false, errorMessage: null});

    const handleRegister = async () => {
        setStatus({loading: true, error: false, errorMessage: null});
        if(verifyInput()){
            try {
                await auth.createUserWithEmailAndPassword(email, password);
            } catch(error) {
                setStatus({loading: false, error: true, errorMessage: "Registration failed"});
            }
        }
    }

    const verifyInput = () => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(password !== rPassword){
            setStatus({loading: false, error: true, errorMessage: "De wachtwoorden zijn niet gelijk"});
            return false;
        } else if (!reg.test(password)) {
            setStatus({loading: false, error: true, errorMessage: "Het wachtwoord moet minstens bestaan uit 8 tekens en minstens 1 nummer en 1 letter hebben."});
            return false;
        } else return true;
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
                        <IonText color="danger">
                            <p>{ status.errorMessage }</p>
                        </IonText>
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
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Repeat Password</IonLabel>
                        <IonInput type={"password"} value={rPassword}
                                  onIonChange={(event) => setRPassword(event.detail.value)}
                        />
                    </IonItem>
                </IonList>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonButton onClick={handleRegister}>Register</IonButton>
                        <IonLoading isOpen={status.loading}/>
                    </IonRow>
                    <IonRow  class="ion-justify-content-center">
                        <IonRow  class="ion-justify-content-center" className={styles.row}>
                            <IonRouterLink routerLink="/login" className={styles.login}>Of Login</IonRouterLink>
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;