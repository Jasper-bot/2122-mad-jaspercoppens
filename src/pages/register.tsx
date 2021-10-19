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

import styles from './Register.module.css';
import RegisterHeader from "../components/RegisterHeader";

const Register: React.FC = () => {
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
                       <IonButton>Register</IonButton>
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