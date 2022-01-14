import React, {useEffect, useState} from 'react'
import styles from "./Message.module.css"
import {IonCol,  IonRow} from "@ionic/react";
import {MessageModel, toMessage} from "../models/messageModel";
import {useAuth} from "../auth";
import {db} from "../firebase/firebase.utils";
import firebase from "firebase/compat";

interface MessageProps {
    message: MessageModel;
}

const Message: React.FC<MessageProps> = ({ message}) => {
    const { userId } = useAuth();
    const [showName, setShowName] = useState(false)

    return (
        <IonRow class={"ion-no-margin ion-no-padding"} >
            <IonCol offset={`${message.userid == userId ? 3 : 0}`} size="9" className="ion-no-margin ion-no-padding">
                {/*{message.userid != userId ?  <p className={styles.username} >{message.username}</p> : <div />}*/}
                { showName ?  <p className={styles.username} >{message.username}</p> : <div />}
                <p className={`text ${message.userid == userId ? styles.sender : styles.receiver}`} onClick={() => setShowName(!showName)}>{message.text}</p>
            </IonCol>
        </IonRow>
    );
};

export default Message;