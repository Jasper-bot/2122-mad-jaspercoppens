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
    IonPage, IonRow
} from "@ionic/react";
import './register.css';
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
                       <a id={"login-link"}>Of Login</a>
                   </IonRow>
               </IonGrid>
           </IonContent>
        </IonPage>
    );
};

export default Register;