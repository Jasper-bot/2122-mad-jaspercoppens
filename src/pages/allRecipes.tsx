import {IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './allRecipes.css';
import { db } from '../firebase/firebase.utils';
import {useEffect, useState} from "react";

const AllRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState([]);
    // als values in deps param veranderen wordt deze functie uitgevoerd + bij startup pagina
    useEffect(() => {
        const recipesRef = db.collection('recipes');
        recipesRef.get().then((snapshot) => {
           const recipes = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
           }));
          setRecipes(recipes);
        });
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">All recipes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {recipes.map((entry) =>
                    <IonItem button key={entry.id}>
                        {entry.title}
                    </IonItem>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default AllRecipes;
