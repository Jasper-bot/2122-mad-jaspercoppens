import {
    IonButton,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton, IonGrid,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonList, IonListHeader,
    IonPage, IonRow, IonText,
} from '@ionic/react';
import {db, storage} from '../firebase/firebase.utils';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {Recipe, toRecipe} from "../models/recipe";
import {chatbubble, heart, heartOutline} from "ionicons/icons";
import Header from "../components/Header";
import styles from "./RecipePage.module.css";
import {useAuth} from "../auth";

interface RouteParams {
    id: string;
}

async function savePhoto(blobUrl, recipeId, uploaderName) {
    const uid = uploaderName + "." + Date.now().toString(36) + Math.random().toString(36).substr(2);
    const photoRef = storage.ref(`/images/${recipeId}/${uid}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await photoRef.put(blob);
}

const RecipePage: React.FC = () => {
    const { userName, favoriteRecipes, userId } = useAuth();
    const { id } = useParams<RouteParams>() ;
    const [recipe, setRecipe] = useState<Recipe>();
    const [photo, setPhoto] = useState('/assets/images/addImage.png');
    const [pictures, setPictures] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [favorite, setFavorite] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const recipeRef = db.collection('recipes').doc(id);
        recipeRef.get().then ((doc) => setRecipe(toRecipe(doc)));
        if(favoriteRecipes.includes(id)) setFavorite(true);
    }, [id]);

    useEffect(() => () => {
        if(photo.startsWith('blob:')){
            URL.revokeObjectURL(photo);
        }
    }, [photo]);

    useEffect(() => {
        storage.ref().child(`images/${id}`).listAll()
            .then(res => {
                console.log(res);
                res.items.forEach((item) => {
                    item.getDownloadURL().then((url) => {
                        setPictures(arr => [...arr, url]);
                    })
                })
            }).catch(err => {
            alert(err.message);
        });

    },[id]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const photoUrl = URL.createObjectURL(file);
            setPhoto(photoUrl);
        }
    }

    const handleAddPhoto = async () => {
        if(photo == '/assets/images/addImage.png'){
            setUploadMessage('Je hebt geen foto geselecteerd');
        }
        try {
            await savePhoto(photo, id, userName);
            setUploadMessage('foto added succesfully');
        }catch (e) {
            setUploadMessage(e.message);
        }
    }

    const changeFavorite = async () => {
        const userRef = db.collection('users').doc(userId);
        if(favorite) {
           await updateDoc(userRef, {
                favoriteRecipes: arrayRemove(id)
           });
        } else {
            //voeg toe aan de array
            await updateDoc(userRef, {
                favoriteRecipes: arrayUnion(id)
            });
        }
        setFavorite(!favorite);
    }

    return (
        <IonPage >
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    <IonRow className={["ion-align-items-center", "ion-justify-content-center"].join(" ")} >
                        <IonCol offset="3">
                            <h2>{recipe?.title}</h2>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={changeFavorite}><IonIcon icon={favorite? heart : heartOutline} className={styles.heart}/></IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offset="3" class={"ion-no-padding"}>
                            <p  className={[styles.uploader].join(" ")} >Door {recipe?.userName }</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className={styles.colimage}>
                            <img src={recipe?.photo} alt={recipe?.title}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <p>{recipe?.description}</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonList>
                    <IonListHeader>
                        Ingrediënten
                    </IonListHeader>
                    {recipe?.ingredients.map((entry, i) =>
                        <IonItem key={i}>
                            <IonLabel>
                                <p>
                                    {entry.valueOf()}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
                <IonListHeader>
                    Stappen
                </IonListHeader>
                <IonList>
                    {recipe?.steps.map((entry, i) =>
                        <IonItem key={entry.valueOf()}>
                            <IonLabel>
                                <p className="ion-text-wrap">
                                    {i += 1}: {entry.valueOf()}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
                <IonListHeader>
                    Fotos
                </IonListHeader>
                <IonList>
                    {pictures.map((val, index) =>
                        <img src={val.valueOf()} alt={val.valueOf()} key={index}/>
                    )}
                </IonList>
                <IonItem lines="inset">
                    <IonLabel position={"stacked"}>Foto</IonLabel>
                    <IonText color="warning">
                        <p>{uploadMessage}</p>
                    </IonText>

                    <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} hidden className={styles.img}/>
                    <img src={photo} alt=""
                         onClick={() => fileInputRef.current.click()}/>
                    <IonButton onClick={handleAddPhoto}>Upload foto</IonButton>
                </IonItem>
                <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                    <IonFabButton>
                        <IonIcon icon={chatbubble} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default RecipePage;