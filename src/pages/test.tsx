import {
    IonButton, IonCol,
    IonContent, IonFooter, IonGrid,
    IonHeader, IonIcon, IonInput,
    IonItem, IonLabel, IonList,
    IonPage,
    IonRouterLink, IonRow, IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import styles from "./Account.module.css";
import React, {useEffect, useState} from "react";
import { auth } from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";
import {home, moon} from "ionicons/icons";
import {removeWhitespaceFromArray, removeWhitespaceFromString, stringToArrayByComma} from "../helperfunctions";
import {db, storage} from '../firebase/firebase.utils';
import { send } from 'ionicons/icons';
import {Recipe, toRecipe} from "../models/recipe";
import {MessageModel, toMessage} from "../models/messageModel";
import Message from '../components/Message'

const Test: React.FC = () => {
    const { userName } = useAuth();
    const [errors, setErrors] = useState({isValid: true, errorMessages: []})
    const [messages, setMessages] = useState<MessageModel[]>([]);

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

    useEffect(() => {
        const messagesRef = db.collection('recipes').doc("BOPHNw18VfuvU6oI2EqW").collection('messages');
        messagesRef.onSnapshot(({ docs }) => setMessages(docs.map(toMessage)));
    });

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                        {messages.map((message, index) =>
                            <Message message={message} key={index}></Message>
                        )}
                </IonGrid>

            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonRow>
                        <IonCol size='10'>
                            <IonTextarea autoGrow={true} maxlength={500} ></IonTextarea>
                        </IonCol>
                        <IonCol size='2'>
                            <IonButton>
                                <IonIcon icon={send} slot="icon-only" />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    );
};

export default Test;
