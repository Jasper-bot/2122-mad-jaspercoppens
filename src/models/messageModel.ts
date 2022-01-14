import {Recipe} from "./recipe";
import firebase from "firebase/compat/app";

export interface MessageModel {
    text: string,
    username: string,
    userid: string,
    createdAt:  firebase.firestore.FieldValue,
    recipeid:string;
}

export function toMessage(doc): MessageModel {
    return {id: doc.id, ...doc.data()};
}