import {
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonSearchbar,
    IonGrid,
    IonButton,
    IonText,
    IonTextarea,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import styles from "./SearchRecipes.module.css";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {funnel, funnelOutline} from 'ionicons/icons';
import {auth, db} from "../firebase/firebase.utils";
import {Recipe, toRecipe} from "../models/recipe";
import {useAuth} from "../auth";

const SearchRecipes: React.FC = () => {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [hideCategories, setHideCategories] = useState(true);
    const [hideSearchOnIngr, setHideSearchOnIngr] = useState(true);
    const [ingredients, setIngredients] = useState('');
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');

    const clickFunnel = () => {
        setHideCategories(!hideCategories);
    }

    const showSearchOnIngredients = () => {
        setHideSearchOnIngr(!hideSearchOnIngr);
    }

    useEffect(() => {
        if(searchText != ''){
            const recipesRef = db
                .collection('recipes')
                .where("title", "==", searchText );
            return recipesRef.onSnapshot(({ docs }) => setRecipes(docs.map(toRecipe)));
        }
        if(searchText == ''){
            const recipesRef = db
                .collection('recipes');
            return recipesRef.onSnapshot(({ docs }) => setRecipes(docs.map(toRecipe)));
        }
    }, [searchText]);

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonItem lines="none">
                    <IonIcon icon={hideCategories? funnelOutline: funnel} onClick={clickFunnel}/>
                    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                </IonItem>
                <IonItem lines="none" hidden={hideCategories} >
                    <IonRadioGroup allowEmptySelection={true} className={styles.centerx} value={category} onIonChange={e => setCategory(e.detail.value)}>
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
                <IonItem hidden={hideSearchOnIngr} lines="none" className={[styles.center_textx , styles.centerx].join(" ")} >
                    <IonList className={styles.centerx}>
                        <IonTextarea value={ingredients}
                                     onIonChange={(event) => setIngredients(event.detail.value)} placeholder={'Geef hier ingrediënten in, gescheiden door een komma'} autoGrow={true}/>
                        <IonButton color="dark">Zoek</IonButton>
                    </IonList>
                </IonItem>
                {recipes.map((entry) =>
                    <IonCard routerLink={`/my/recipes/view/${entry.id}`} key={entry.id}>
                        <img src={entry.photo} alt={entry.title}/>
                        <IonCardHeader>
                            <IonCardSubtitle>{entry.userName}</IonCardSubtitle>
                            <IonCardTitle>{entry.title}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>{entry.description}</IonCardContent>
                    </IonCard>)}
            </IonContent>
        </IonPage>
    );
};

export default SearchRecipes;
