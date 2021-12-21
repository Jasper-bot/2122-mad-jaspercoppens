import {
    IonButton,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton, IonGrid,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonList, IonListHeader,
    IonPage, IonRow, IonText, useIonAlert,
} from '@ionic/react';
import {db, storage} from '../firebase/firebase.utils';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import React, {useEffect, useRef, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Recipe, toRecipe} from "../models/recipe";
import {chatbubble, heart, heartOutline, text} from "ionicons/icons";
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
    const [previousPhoto, setPreviousPhoto] = useState('/assets/images/addImage.png');
    const [pictures, setPictures] = useState({urls: [], names: []});
    const [uploadMessage, setUploadMessage] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [confirmDelete] = useIonAlert();

    const history = useHistory();
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
        setPictures({urls: [], names: []});
        storage.ref().child(`images/${id}`).listAll()
            .then(res => {
                res.items.forEach((item) => {
                    if(item.name  != id) {
                        let name = getName(item.name);
                        item.getDownloadURL().then((url) => {
                            setPictures(prevState => ({urls: [...prevState.urls, url], names: [...prevState.names, name]}));
                        });
                    }
                })
            }).catch(err => {
            alert(err.message);
        });
    },[id, uploadMessage]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const photoUrl = URL.createObjectURL(file);
            setPhoto(photoUrl);
        }
    }

    const getName = (name) => {
        return name.substring(0, name.indexOf("."));
    }

    const handleAddPhoto = async () => {
        if(photo == previousPhoto){
            setUploadMessage('Je hebt geen foto geselecteerd of je hebt deze foto al geüploadt.');
        } else {
            try {
                await savePhoto(photo, id, userName);
            }catch (e) {
                setUploadMessage(e.message);
            } finally {
                setPreviousPhoto(photo);
                setUploadMessage('foto added succesfully');
            }
        }
    }

    const changeFavorite = async () => {
        const userRef = db.collection('users').doc(userId);
        if(favorite) {
           await updateDoc(userRef, {
                favoriteRecipes: arrayRemove(id)
           });
        } else {
            await updateDoc(userRef, {
                favoriteRecipes: arrayUnion(id)
            });
        }
        setFavorite(!favorite);
    }

    const handleEdit = () => {
        console.log("edit");
    }

    const handleDelete = async () => {
        const storageRef = storage.ref(`images/${id}`);
        storageRef.listAll().then((listResults) => {
            const promises = listResults.items.map((item) => {
                return item.delete();
            });
            Promise.all(promises);
        }).catch((error) => {
            console.log("Error removing document:", error);
            return;
        });
        await deleteDoc(doc(db, "recipes", id)).then(() => {
                history.goBack();
            }
        ).catch((error) => {
            console.log("Error removing document:", error);
        });
    }

    return (
        <IonPage >
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent class="ion-padding">
                <IonGrid>
                    {recipe?.userId === userId &&
                        <IonRow className={["ion-align-items-center", "ion-justify-content-center"].join(" ")}>
                            <IonCol offset="2">
                                <IonButton color={"danger"} onClick={() => confirmDelete({
                                    header:'Verwijder recept',
                                    message:'Ben je zeker dat je dit recept wil verwijderen?',
                                    buttons:['Nee!', {text: 'Ja!', handler:handleDelete}]
                                })

                                }>Verwijder Recept</IonButton>
                            </IonCol>
                        </IonRow>
                    }
                    {recipe?.userId === userId &&
                    <IonRow className={["ion-align-items-center", "ion-justify-content-center"].join(" ")}>
                        <IonCol offset="2">
                            <IonButton color={"warning"} onClick={handleEdit}>Bewerk Recept</IonButton>
                        </IonCol>
                    </IonRow>
                    }
                    <IonRow className={["ion-align-items-center", "ion-justify-content-center"].join(" ")} >
                        <IonCol offset="3">
                            <h2>{recipe?.title}</h2>
                        </IonCol>
                        <IonCol>
                            <IonItem lines="none" onClick={changeFavorite}><IonIcon icon={favorite? heart : heartOutline} className={styles.heart}/></IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offset="3">
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
                {pictures.urls.length == 0 &&
                <IonText color={"primary"}>
                    <p>Er zijn nog geen foto's toegevoegd aan dit recept door andere gebruikers. Voeg als eerste een foto toe!</p>
                </IonText>
                }
                <IonList>
                    {pictures.urls.map((val, index) =>
                        <div key={index}>
                            <img src={val.valueOf()} alt={val.valueOf()}/>
                            <p>Foto geplaatst door: {pictures.names[index]}</p>
                        </div>
                    )}
                </IonList>
                <IonItem lines="none">
                    <IonLabel position={"stacked"}>Upload een nieuwe foto:</IonLabel>
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