import firebase from "firebase/compat/app";

import {Timestamp} from "firebase/firestore";

export interface MessageModel {
    id?: string,
    text: string,
    username: string,
    userid: string,
    createdAt:  Timestamp
    recipeid: string
}

export function toMessage(doc): MessageModel {
    return {id: doc.id, ...doc.data()};
}