import {
    IonButton, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonImg,
    IonItem, IonLabel, IonList,
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
    const [hideVleesBdg, setHideVleesBdg] = useState(true);
    const [hideVisBdg, setHideVisBdg] = useState(true);
    const [hideVeggieBdg, setHideVeggieBdg] = useState(true);
    const [hideDessertBdg, setHideDessertBdg] = useState(true);
    const [hideAndereBdg, setHideAndereBdg] = useState(true);

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
                <IonGrid>
                    <IonRow>
                        <IonCol onClick={() => setHideVleesBdg(!hideVleesBdg)}>
                            <IonList>
                                <IonImg src={"assets/icon/meat.png"} className={styles.icons}/>
                                <IonLabel>
                                    {vleesBdgLvl[0] > 10 && vleesBdgLvl[1] > 20 ? "Slager lvl 3" : vleesBdgLvl[0] > 5 && vleesBdgLvl[1] > 10 ? "Slager lvl 2" :  vleesBdgLvl[0] > 1 && vleesBdgLvl[1] > 2? "Slager lvl 1" :"Slager lvl 0" }
                                </IonLabel>
                            </IonList>
                        </IonCol>
                        <IonCol onClick={() => setHideVisBdg(!hideVisBdg)}>
                            <IonList>
                               <IonImg src={"assets/icon/fish.png"} className={styles.icons}/>
                                <IonLabel>
                                    {visBdgLvl[0] > 10 && visBdgLvl[1] > 20 ? "Visser lvl 3" : visBdgLvl[0] > 5 && visBdgLvl[1] > 10 ? "Visser lvl 2" :  visBdgLvl[0] > 1 && visBdgLvl[1] > 2? "Visser lvl 1" :"Visser lvl " }
                                </IonLabel>
                            </IonList>
                        </IonCol>
                        <IonCol onClick={() => setHideVeggieBdg(!hideVeggieBdg)}>
                            <IonList>
                                <IonImg src={"assets/icon/vegan.png"} className={styles.icons}/>
                                <IonLabel>
                                    {veggieBdgLvl[0] > 10 && veggieBdgLvl[1] > 20 ? "Groenteboer lvl 3" : veggieBdgLvl[0] > 5 && veggieBdgLvl[1] > 10 ? "Groenteboer lvl 2" :  veggieBdgLvl[0] > 1 && veggieBdgLvl[1] > 2? "Groenteboer lvl 1" :"Groenteboer lvl 0" }
                                </IonLabel>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow hidden={hideVleesBdg}>
                        {
                            vleesBdgLvl[0] > 10 && vleesBdgLvl[1] > 20 ?
                                `Proficiat! Je bent een slager van topniveau!`
                            : vleesBdgLvl[0] > 5 && vleesBdgLvl[1] > 10 ?
                                `Upload nog ${10 - vleesBdgLvl[0] < 0 ? 0: 10 - vleesBdgLvl[0]} recepten met vlees en ${20 - vleesBdgLvl[1] < 0? 0 : 20 - vleesBdgLvl[1] }  foto’s van vleesgerechten van andere gebruikers om Slager lvl 3 te verdienen.`
                            :  vleesBdgLvl[0] > 1 && vleesBdgLvl[1] > 2?
                                 `Upload nog ${5 - vleesBdgLvl[0] < 0 ? 0 : 5 - vleesBdgLvl[0]} recepten met vlees en ${10 - vleesBdgLvl[1] < 0 ? 0: 10 - vleesBdgLvl[1]}  foto’s van vleesgerechten van andere gebruikers om Slager lvl 2 te verdienen.`
                            :
                                 `Upload nog ${1 - vleesBdgLvl[0] < 0 ? 0: 1 - vleesBdgLvl[0]} recepten met vlees en ${2 - vleesBdgLvl[1] < 0 ? 0: 2 - vleesBdgLvl[1]}  foto’s van vleesgerechten van andere gebruikers om Slager lvl 1 te verdienen.`
                        }
                    </IonRow>
                    <IonRow hidden={hideVisBdg}>
                        {
                            visBdgLvl[0] > 10 && visBdgLvl[1] > 20 ?
                                `Proficiat! Je bent een Visser van topniveau!`
                                : visBdgLvl[0] > 5 && visBdgLvl[1] > 10 ?
                                    `Upload nog ${10 - visBdgLvl[0] < 0 ? 0: 10 - visBdgLvl[0]} recepten met vis en ${20 - visBdgLvl[1] < 0? 0 : 20 - visBdgLvl[1] }  foto’s van visgerechten van andere gebruikers om Visser lvl 3 te verdienen.`
                                    :  visBdgLvl[0] > 1 && visBdgLvl[1] > 2?
                                        `Upload nog ${5 - visBdgLvl[0] < 0 ? 0 : 5 - visBdgLvl[0]} recepten met vlees en ${10 - visBdgLvl[1] < 0 ? 0: 10 - visBdgLvl[1]}  foto’s van visgerechten van andere gebruikers om Visser lvl 2 te verdienen.`
                                        :
                                        `Upload nog ${1 - visBdgLvl[0] < 0 ? 0: 1 - visBdgLvl[0]} recepten met vlees en ${2 - visBdgLvl[1] < 0 ? 0: 2 - visBdgLvl[1]}  foto’s van visgerechten van andere gebruikers om Visser lvl 1 te verdienen.`
                        }
                    </IonRow>
                    <IonRow hidden={hideVeggieBdg}>
                        {
                            veggieBdgLvl[0] > 10 && veggieBdgLvl[1] > 20 ?
                                `Proficiat! Je bent een Groenteboer van topniveau!`
                                : veggieBdgLvl[0] > 5 && veggieBdgLvl[1] > 10 ?
                                    `Upload nog ${10 - veggieBdgLvl[0] < 0 ? 0: 10 - veggieBdgLvl[0]} veggierecepten en ${20 - veggieBdgLvl[1] < 0? 0 : 20 - veggieBdgLvl[1] }  foto’s van veggierecepten van andere gebruikers om Groenteboer lvl 3 te verdienen.`
                                    :  veggieBdgLvl[0] > 1 && veggieBdgLvl[1] > 2?
                                        `Upload nog ${5 - veggieBdgLvl[0] < 0 ? 0 : 5 - veggieBdgLvl[0]} veggierecepten en ${10 - veggieBdgLvl[1] < 0 ? 0: 10 - veggieBdgLvl[1]}  foto’s van veggierecepten van andere gebruikers om Groenteboer lvl 2 te verdienen.`
                                        :
                                        `Upload nog ${1 - veggieBdgLvl[0] < 0 ? 0: 1 - veggieBdgLvl[0]} veggierecepten en ${2 - veggieBdgLvl[1] < 0 ? 0: 2 - veggieBdgLvl[1]}  foto’s van veggierecepten van andere gebruikers om Groenteboer lvl 1 te verdienen.`
                        }
                    </IonRow>
                    <IonRow>
                        <IonCol onClick={() => setHideDessertBdg(!hideDessertBdg)}>
                            <IonList>
                                <IonImg src={"assets/icon/cake.png"} className={styles.icons}/>
                                <IonLabel>
                                    {dessertBdgLvl[0] > 10 && dessertBdgLvl[1] > 20 ? "Liefhebber lvl 3" : dessertBdgLvl[0] > 5 && dessertBdgLvl[1] > 10 ? "Liefhebber lvl 2" :  dessertBdgLvl[0] > 1 && dessertBdgLvl[1] > 2? "Liefhebber lvl 1" :"Liefhebber lvl 0" }
                                </IonLabel>
                            </IonList>
                        </IonCol>
                        <IonCol onClick={() => setHideAndereBdg(!hideAndereBdg)}>
                            <IonList>
                                <IonImg src={"assets/icon/restaurant.png"} className={styles.icons}/>
                                <IonLabel>
                                    {andereBdgLvl[0] > 10 && andereBdgLvl[1] > 20 ? "Alternatieveling lvl 3" : andereBdgLvl[0] > 5 && andereBdgLvl[1] > 10 ? "Alternatieveling lvl 2" :  andereBdgLvl[0] > 1 && andereBdgLvl[1] > 2? "Alternatieveling lvl 1" :"Alternatieveling lvl 0" }
                                </IonLabel>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow hidden={hideDessertBdg}>
                        {
                            dessertBdgLvl[0] > 10 && dessertBdgLvl[1] > 20 ?
                                `Proficiat! Je bent een Dessert liefhebber van topniveau!`
                                : dessertBdgLvl[0] > 5 && dessertBdgLvl[1] > 10 ?
                                    `Upload nog ${10 - dessertBdgLvl[0] < 0 ? 0: 10 - dessertBdgLvl[0]} desserts en ${20 - dessertBdgLvl[1] < 0? 0 : 20 - dessertBdgLvl[1] }  foto’s van desserts van andere gebruikers om Liefhebber lvl 3 te verdienen.`
                                    :  dessertBdgLvl[0] > 1 && dessertBdgLvl[1] > 2?
                                        `Upload nog ${5 - dessertBdgLvl[0] < 0 ? 0 : 5 - dessertBdgLvl[0]} desserts en ${10 - dessertBdgLvl[1] < 0 ? 0: 10 - dessertBdgLvl[1]}  foto’s van desserts van andere gebruikers om Liefhebber lvl 2 te verdienen.`
                                        :
                                        `Upload nog ${1 - dessertBdgLvl[0] < 0 ? 0: 1 - dessertBdgLvl[0]} desserts en ${2 - dessertBdgLvl[1] < 0 ? 0: 2 - dessertBdgLvl[1]}  foto’s van desserts van andere gebruikers om Liefhebber lvl 1 te verdienen.`
                        }
                    </IonRow>
                    <IonRow hidden={hideAndereBdg}>
                        {
                            andereBdgLvl[0] > 10 && andereBdgLvl[1] > 20 ?
                                `Proficiat! Je bent een Alternatieveling van topniveau!`
                                : andereBdgLvl[0] > 5 && andereBdgLvl[1] > 10 ?
                                    `Upload nog ${10 - andereBdgLvl[0] < 0 ? 0: 10 - andereBdgLvl[0]} recepten in de categorie "andere" en ${20 - andereBdgLvl[1] < 0? 0 : 20 - andereBdgLvl[1] }  foto’s van recepten in de categorie "andere" van andere gebruikers om Alternatieveling lvl 3 te verdienen.`
                                    :  andereBdgLvl[0] > 1 && andereBdgLvl[1] > 2?
                                        `Upload nog ${5 - andereBdgLvl[0] < 0 ? 0 : 5 - andereBdgLvl[0]} recepten in de categorie "andere" en ${10 - andereBdgLvl[1] < 0 ? 0: 10 - andereBdgLvl[1]}  foto’s van recepten in de categorie "andere" van andere gebruikers om Alternatieveling lvl 2 te verdienen.`
                                        :
                                        `Upload nog ${1 - andereBdgLvl[0] < 0 ? 0: 1 - andereBdgLvl[0]} recepten in de categorie "andere" en ${2 - andereBdgLvl[1] < 0 ? 0: 2 - andereBdgLvl[1]}  foto’s van recepten in de categorie "andere" van andere gebruikers om Alternatieveling lvl 1 te verdienen.`
                        }
                    </IonRow>
                </IonGrid>
                <IonItem>
                    <IonIcon slot="start" icon={moon} />
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle
                        slot="end"
                        name="darkMode"
                        onIonChange={toggleDarkModeHandler}
                    />
                </IonItem>
                <IonButton fill="clear" color="dark" className={styles.logout}
                    onClick={() => auth.signOut()}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Account;