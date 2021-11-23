import {
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage, IonRadio, IonRadioGroup,
    IonSearchbar,
    IonGrid, IonButton, IonText, IonTextarea, IonList
} from '@ionic/react';
import styles from "./SearchRecipes.module.css";
import React, {useState} from "react";
import Header from "../components/Header";
import {funnel, funnelOutline} from 'ionicons/icons';
import {auth} from "../firebase/firebase.utils";

const SearchRecipes: React.FC = () => {
    const [funnelOn, setFunnelOn] = useState(false);
    const [showSearchOnIngr, setShowSearchOnIngr] = useState(false);
    const [ingredients, setIngredients] = useState('');

    const clickFunnel = () => {
        setFunnelOn(!funnelOn);
    }

    const showSearchOnIngredients = () => {
        setShowSearchOnIngr(!showSearchOnIngr);
    }

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonItem lines="none">
                    <IonIcon icon={funnelOn? funnelOutline: funnel} onClick={clickFunnel}/>
                    <IonSearchbar></IonSearchbar>
                </IonItem>
                <IonItem lines="none" hidden={funnelOn} >
                    <IonRadioGroup allowEmptySelection={true} className={styles.centerx}>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel >
                                            Vis
                                        </IonLabel>
                                        <IonRadio slot="start" value="vis" />
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel>
                                            Vlees
                                        </IonLabel>
                                        <IonRadio slot="start" value="Vlees" />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel>
                                            Veggie
                                        </IonLabel>
                                        <IonRadio slot="start" value="Veggie" />
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel>
                                            Dessert
                                        </IonLabel>
                                        <IonRadio slot="start" value="Dessert" />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel>
                                            Andere
                                        </IonLabel>
                                        <IonRadio slot="start" value="Andere" />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonRadioGroup>
                </IonItem>
                <IonItem lines="none">
                    <IonButton fill="clear" color="dark" className={[styles.logoutx, styles.centerx].join(" ")}
                               onClick={showSearchOnIngredients}>
                        Of zoek op ingrediënten
                    </IonButton>
                </IonItem>
                <IonItem hidden={showSearchOnIngr} lines="none" className={[styles.center_textx , styles.centerx].join(" ")} >
                    <IonList className={styles.centerx}>
                        <IonTextarea value={ingredients}
                                     onIonChange={(event) => setIngredients(event.detail.value)} placeholder={'Geef hier ingrediënten in, gescheiden door een komma'} autoGrow={true}/>
                        <IonButton color="dark">Zoek</IonButton>
                    </IonList>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default SearchRecipes;
