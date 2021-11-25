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
import { ref, listAll } from "firebase/storage";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {Recipe, toRecipe} from "../models/recipe";
import {chatbubble, heartOutline} from "ionicons/icons";
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
    const { userName } = useAuth();
    const { id } = useParams<RouteParams>();
    const [recipe, setRecipe] = useState<Recipe>();
    const [photo, setPhoto] = useState('/assets/images/addImage.png');
    const [pictures, setPictures] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const recipeRef = db.collection('recipes').doc(id);
        recipeRef.get().then ((doc) => setRecipe(toRecipe(doc)));
    }, [id]);

    useEffect(() => () => {
        if(photo.startsWith('blob:')){
            URL.revokeObjectURL(photo);
        }
    }, [photo]);

    // useEffect(() => {
    //     const listRef = ref(storage, `images/${recipe.id}`);
    //     let picturesList;
    //     // Find all the prefixes and items.
    //     listAll(listRef)
    //         .then((res) => {
    //             res.items.forEach((itemRef) => {
    //                 // All the items under listRef.
    //                 picturesList.push(itemRef)
    //             });
    //         }).catch((error) => {
    //         // Uh-oh, an error occurred!
    //     });
    //
    //     setPictures(picturesList);
    //     console.log(pictures);
    // },[]);

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
                            <IonIcon icon={heartOutline} className={styles.heart}/>
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
                                <p>
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
                    <p>hier fotos laden vanuit de storage</p>
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