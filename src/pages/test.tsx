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

    const addErrorMessage = (errorMessage) => {
        let joined = errors.errorMessages.concat(errorMessage);
        setErrors({ isValid: false, errorMessages: joined });
    }

    const test = async () => {
        await addErrorMessage('1');
        await addErrorMessage('2');
        console.log(errors);
    }

    function isSubset(array1, array2) {
        // returns true if array2 is a subset of array1

        return array2.every(function (element) {
            return array1.includes(element);
        });
    }

    const test2 = () => {
    let array2 = ['sauzen'];
    let array1 = ['vis', 'frieten', 'groenten', 'sauzen'];

    console.log(array1, array2);

    console.log(isSubset(array1, array2));
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
                <IonButton onClick={test2}>
                    test2
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Test;
