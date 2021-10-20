import React from "react";
import {
    IonButton,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRouterLink,
    IonRow
} from "@ionic/react";

import styles from './Register.module.css';
import RegisterHeader from "../components/RegisterHeader";
import {auth} from "../firebase/firebase.utils";

const Register: React.FC = () => {
    const register = async () => {
        const credential = await auth.createUserWithEmailAndPassword('test@gmail.com', 'testwachtwoord');
        console.log('cred:', credential);
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
                   <IonItem lines="inset">
                       <IonLabel position={"stacked"}>Repeat Password</IonLabel>
                       <IonInput type={"password"}></IonInput>
                   </IonItem>
               </IonList>
               <IonGrid>
                   <IonRow class="ion-justify-content-center">
                       <IonButton onClick={register}>Register</IonButton>
                   </IonRow>
                   <IonRow  class="ion-justify-content-center">
                       <IonRow  class="ion-justify-content-center" className={styles.row}>
                           <IonRouterLink routerLink="/Login" className={styles.login}>Of Login</IonRouterLink>
                       </IonRow>
                   </IonRow>
               </IonGrid>
           </IonContent>
        </IonPage>
    );
};

export default Register;