import {
    IonButton, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonItem, IonLabel,
    IonPage,
    IonRouterLink, IonRow,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import styles from "./Account.module.css";
import React, {useEffect, useState} from "react";
import {auth, db} from '../firebase/firebase.utils.js';
import Header from "../components/Header";
import {useAuth} from "../auth";
import {moon} from "ionicons/icons";
import {toRecipe} from "../models/recipe";
import {toBadges} from "../helperfunctions";

const Account: React.FC = () => {
    const { userName, userId } = useAuth();
    const [badges, setBadges]  = useState([{Dessert: [], Veggie:[], Vis:[], Vlees:[]}])
    const [vleesBdgLvl, setVleesBdgLvl ] = useState([]);
    const [visBdgLvl, setVisBdgLvl ] = useState([]);
    const [veggieBdgLvl, setVeggieBdgLvl ] = useState([]);
    const [dessertBdgLvl, setDessertBdgLvl ] = useState([]);
    const [andereBdgLvl, setAndereBdgLvl ] = useState([]);

    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };

    useEffect(() => {
        const userRef = db.collection('users').doc(userId);
        userRef.onSnapshot((data) => {
            setVleesBdgLvl( data.data().badges.Vlees);
            setVisBdgLvl( data.data().badges.Vis);
            setVeggieBdgLvl( data.data().badges.Veggie);
            setDessertBdgLvl( data.data().badges.Dessert);
            setAndereBdgLvl( data.data().badges.Andere);
        })
    }, [userId, badges]);

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle>Welcome {userName}</IonTitle>
                <IonItem>
                    <IonIcon slot="start" icon={moon} />
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle
                        slot="end"
                        name="darkMode"
                        onIonChange={toggleDarkModeHandler}
                    />
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Vlees</IonLabel>
                                <IonLabel>
                                    {vleesBdgLvl[0] > 10 && vleesBdgLvl[1] > 20 ? 3 : vleesBdgLvl[0] > 5 && vleesBdgLvl[1] > 10 ? 2 :  vleesBdgLvl[0] > 1 && vleesBdgLvl[1] > 2? 1 :0 }
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Vis</IonLabel>
                                <IonLabel>
                                    {visBdgLvl[0] > 10 && visBdgLvl[1] > 20 ? 3 : visBdgLvl[0] > 5 && visBdgLvl[1] > 10 ? 2 :  visBdgLvl[0] > 1 && visBdgLvl[1] > 2? 1 :0 }
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Veggie</IonLabel>
                                <IonLabel>
                                    {veggieBdgLvl[0] > 10 && veggieBdgLvl[1] > 20 ? 3 : veggieBdgLvl[0] > 5 && veggieBdgLvl[1] > 10 ? 2 :  veggieBdgLvl[0] > 1 && veggieBdgLvl[1] > 2? 1 :0 }
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Desserts</IonLabel>
                                <IonLabel>
                                    {dessertBdgLvl[0] > 10 && dessertBdgLvl[1] > 20 ? 3 : dessertBdgLvl[0] > 5 && dessertBdgLvl[1] > 10 ? 2 :  dessertBdgLvl[0] > 1 && dessertBdgLvl[1] > 2? 1 :0 }
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Andere</IonLabel>
                                <IonLabel>
                                    {andereBdgLvl[0] > 10 && andereBdgLvl[1] > 20 ? 3 : andereBdgLvl[0] > 5 && andereBdgLvl[1] > 10 ? 2 :  andereBdgLvl[0] > 1 && andereBdgLvl[1] > 2? 1 :0 }
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton fill="clear" color="dark" className={styles.logout}
                    onClick={() => auth.signOut()}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Account;
