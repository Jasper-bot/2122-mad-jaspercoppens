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
import {removeWhitespaceFromArray, removeWhitespaceFromString, stringToArrayByComma} from "../helperfunctions";
import {db, storage} from '../firebase/firebase.utils';

const Test: React.FC = () => {
    const { userName } = useAuth();
    const [errors, setErrors] = useState({isValid: true, errorMessages: []})

    const addErrorMessage = (errorMessage) => {
        let joined = errors.errorMessages.concat(errorMessage);
        setErrors({ isValid: false, errorMessages: joined });
    }

    const test = async () => {
        const recipeRef = db.collection('recipes').doc('9d7f39GySFe3OCk3znKQ').collection('comments').doc('V1QMHxjwC7DbkLpVr5kt').get();
        console.log(recipeRef.then(data => console.log(data)));
    }

    function test3(){
        let array = ["vuur", "  aard e", "wzAZZEter  "];
        let string = "   LKQD, qmDQFslkdfj,  DQSFq ,d     s, fqsldf mlmlkqj    ,";
        console.log(stringToArrayByComma(string));
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
                <IonButton onClick={test3}>
                    test3
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Test;
