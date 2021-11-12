import {db} from "../firebase/firebase.utils";
import {useState} from "react";

export interface Recipe {
    id: string;
    title: string;
    description: string;
    imagePath: string;
    uploaderId: string;
    uploaderName?: string;
}

export function toRecipe(doc): Recipe {
    return {id: doc.id, ...doc.data()};
}

// export function findUploaderName(uid) {
//     let username;
//     const userRef = db.collection("users").doc(uid);
//     userRef.get().then((doc) => {
//         console.log(doc.data().username);
//         username = (doc.data().username);
//     });
//     return  username;
// }