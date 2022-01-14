import React from 'react'
import styles from "./Message.module.css"
import {IonCol,  IonRow} from "@ionic/react";
import {MessageModel} from "../models/messageModel";
import {useAuth} from "../auth";


interface MessageProps {
    message: MessageModel;
}

const Message: React.FC<MessageProps> = ({ message}) => {
    const { userId } = useAuth();
    return (
        <IonRow>
            <IonCol size="10">
                <p className={styles.text} >{message.username}</p>
                <p>{message.text}</p>
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