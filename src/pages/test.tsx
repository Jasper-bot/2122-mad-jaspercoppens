import {
    IonButton,
    IonContent,
    IonHeader, IonIcon, IonInput,
    IonItem, IonLabel, IonList,
    IonPage,
    IonRouterLink, IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import styles from "./Account.module.css";
import React, {useState} from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";
import {moon} from "ionicons/icons";

const Test: React.FC = () => {
    const { userName } = useAuth();
    const [errors, setErrors] = useState({isValid: true, errorMessages: []})
    const [d, setd] =useState('de');
    const [dee, setDee] = useState(' test');

    const addErrorMessage = (errorMessage) => {
        let joined = errors.errorMessages.concat(errorMessage);
        //let joined =  errors.errorMessages.concat(errors.errorMessages, errorMessage);
        setErrors({ isValid: false, errorMessages: joined });
    }

    const test = async () => {
        await addErrorMessage('1');
        await addErrorMessage('2');
        console.log(errors);
    }

    const de = () => {
        console.log(d);
        console.log(dee);
        let test = d.concat(dee);
        console.log(test);
    }

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {!errors.isValid &&
                        errors.errorMessages.map((entry, index) =>
                            <IonItem key={index}>{entry.valueOf()}</IonItem>
                        )
                    }
                </IonList>
                <IonButton onClick={test}>
                    test
                </IonButton>
                <IonButton onClick={de}>
                    d
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Test;
