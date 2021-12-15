import {useAuth} from "../auth";
import {db} from "../firebase/firebase.utils";

export interface User {
    id: string;
    email: string,
    username: string,
    favoriteRecipes?: string[];
    badges?;
}