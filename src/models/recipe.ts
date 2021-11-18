import {db} from "../firebase/firebase.utils";
import {useState} from "react";

export interface Recipe {
    id: string;
    title: string;
    description: string;
    photo: string;
    uploaderId: string;
    userName?: string;
}

export function toRecipe(doc): Recipe {
    return {id: doc.id, ...doc.data()};
}