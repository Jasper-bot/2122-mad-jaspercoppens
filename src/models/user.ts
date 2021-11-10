import {useAuth} from "../auth";
import {db} from "../firebase/firebase.utils";

export interface User {
    id: string;
    email: string,
    username: string,
}

export function useSetUsername() {
    const auth = useAuth();
    const userRef = db.collection("users").doc(auth.userId);
    userRef.get().then((doc) => {
        const user = {id: doc.id, username: doc.data().username, email: doc.data().email};
        auth.userName = user.username;
    });
}