import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonItem, IonLabel, IonList,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonTextarea,
    IonTitle,
} from '@ionic/react';
import { db } from '../firebase/firebase.utils';
import React, {useEffect, useState} from "react";
import {Recipe, toRecipe} from "../models/recipe";
import Header from "../components/Header";
import {useAuth} from "../auth";
import {funnel, funnelOutline} from "ionicons/icons";
import styles from "./SearchRecipes.module.css";
import {title} from "@ionic/cli/lib/color";

const AllRecipes: React.FC = () => {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [hideCategories, setHideCategories] = useState(true);
    const [hideSearchOnIngr, setHideSearchOnIngr] = useState(true);
    const [ingredients, setIngredients] = useState('');
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');

    // als values in deps param veranderen wordt deze functie uitgevoerd + bij startup pagina
    useEffect(() => {
        const recipesRef = db.collection('recipes');
        recipesRef.onSnapshot(({ docs }) => setRecipes(docs.map(toRecipe)));
        recipesRef.onSnapshot(({ docs }) => setAllRecipes(docs.map(toRecipe)));
        }, [userId]);

    useEffect(() => {
        let filter = {
            title: searchText,
            ingredients: getIngredientsArray(),
            category: category
        }

        // @TODO filteren op ingredienten
        let newRecipes = allRecipes.filter(obj =>
            (filter.title === "" || filter.title === undefined || obj.title.includes(filter.title) ) &&
            (filter.category === "" || filter.category === undefined || obj.category === filter.category));

        setRecipes(newRecipes);
    }, [searchText, category, ingredients]);

    const getIngredientsArray = () => {
        return  ingredients.split(',');
    }

    const clickFunnel = () => {
        setHideCategories(!hideCategories);
    }

    const showSearchOnIngredients = () => {
        setHideSearchOnIngr(!hideSearchOnIngr);
    }

    // useEffect(() => {
    //
    // }, recipes)

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle className="ion-padding">Alle Recepten</IonTitle>
                <IonItem lines="none">
                    <IonIcon icon={hideCategories? funnelOutline: funnel} onClick={clickFunnel}/>
                    <IonSearchbar placeholder="Zoek op titel..." value={searchText} onIonChange={e => setSearchText(e.detail.value!)} />
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

export default AllRecipes;