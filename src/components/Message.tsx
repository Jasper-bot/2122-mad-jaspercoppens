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

    return (
        <IonRow class={"ion-no-margin ion-no-padding"} >
            <IonCol offset={`${message.userid == userId ? 3 : 0}`} size="9" className="message ion-no-margin ion-no-padding">
                {message.userid != userId ?  <p className={styles.username} >{message.username}</p> : <div />}
                <p className={`text ${message.userid == userId ? styles.sender : styles.receiver}`}>{message.text}</p>
            </IonCol>
        </IonRow>
    );
};

export default Message;

//
// export default function MessageModel({data}) {
//     const {message,sender} = data
//
//    //  const MessageModel = style.div`
//    // min-height: 21px;
//    // max-width: 90%;
//    // min-width: 50%;
//    // width: max-content;
//    // background: ${sender?'pink':'blue'};;
//    // text-align: left;
//    // padding: 10px;
//    // border-radius: 10px;
//    // color: white;
//    // margin: 15px 0;
//    // float: ${sender?'left':'right'};;
//    // `
//
//     return (
//         <MessageModel data={undefined}>
//             {message}
//         </MessageModel>
//     )
// }