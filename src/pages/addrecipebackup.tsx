import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonListHeader,
    IonPage, IonRadio, IonRadioGroup,
    IonRow, IonTextarea
} from '@ionic/react';
import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import {db, storage} from '../firebase/firebase.utils';
import {useAuth} from "../auth";
import {useHistory} from "react-router";
import styles from "./AddRecipe.module.css";
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from '@capacitor/camera';
import {stringToArrayByComma, stringToArrayByNewline} from "../helperfunctions";

async function savePhoto(blobUrl, idNewRecipe) {
    const photoRef = storage.ref(`/images/${idNewRecipe}/${idNewRecipe}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await photoRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    await db.collection("recipes").doc(idNewRecipe).update({
        photo: url
    });
}

const AddRecipebackup: React.FC = () => {
    const [errors, setErrors] = useState({isValid: true, errorMessages: []})
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState('4');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [photo, setPhoto] = useState('/assets/images/addImage.png');

    const {userId, userName}  = useAuth();
    const history = useHistory();
    const fileInputRef = useRef<HTMLInputElement>();

    useEffect(() => () => {
        if(photo.startsWith('blob:')){
            URL.revokeObjectURL(photo);
        }
    }, [photo]);

    const getIngredientsArray = () => {
        return stringToArrayByComma(ingredients);
    }

    const getStepsArray = () => {
        return stringToArrayByNewline(steps);
        //return steps.split("\n\n");
    }

    const addErrorMessage = (errorMessage) => {
        let joined = errors.errorMessages.concat(errorMessage);
        console.log(joined);
        setErrors({ isValid: false, errorMessages: joined });
    }

    const errorCheck = async (ingredientsArray, stepsArray) => {
        setErrors({isValid: true, errorMessages: []});
        const categories = ["Vis", "Vlees", "Veggie", "Dessert", "Andere"];
        let numberOfPersonsNumber = Number(numberOfPersons);
        if (title.length < 5) {
            console.log(title.length);
            addErrorMessage('Gebruik minstens vijf karakters voor de titel.');
        }
        if (description.length < 20) addErrorMessage('Gebruik minstens 20 karakters voor de beschrijving.');
        if (!categories.includes(category))  addErrorMessage("Je hebt een foute of geen categorie geselecteerd.");
        if (isNaN(numberOfPersonsNumber))  addErrorMessage("Je moet een numerieke waarde ingeven bij aantal personen.");
        if (numberOfPersonsNumber < 0 || numberOfPersonsNumber > 100)  addErrorMessage("Je aantal personen moet een getal tussen 1 en 100 zijn.");
        if (ingredientsArray.length < 3)  addErrorMessage("Geef minstens 3 ingrediënten in.");
        if (stepsArray.length < 3 )  addErrorMessage("Geef minstens 3 stappen op.");
        if (photo == "/assets/images/addImage.png")   addErrorMessage("Stel een eigen foto in.");
        console.log(errors.errorMessages);
    }

    const handleAddRecipe = async () => {
        const recipesRef = db.collection('recipes');
        const steps = getStepsArray();
        const ingredients = getIngredientsArray();
        await errorCheck(ingredients, steps);
        if(errors.errorMessages.length === 0){
            const recipeData = { title, description, userId, userName, photo, steps, ingredients, category};
            const recipeRef = await recipesRef.add(recipeData);

            if (recipeData.photo.startsWith('blob:')){
                await savePhoto(photo, recipeRef.id);
            }
            history.goBack();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const photoUrl = URL.createObjectURL(file);
            setPhoto(photoUrl);
        }
    }

    const handlePictureClick = async () => {
        //fileInputRef.current.click();
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent class="ion-padding">
                <IonList>
                    {!errors.isValid &&
                    errors.errorMessages.map((entry, index) =>
                        <IonItem key={index}>{entry.valueOf()}</IonItem>
                    )
                    }
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Title</IonLabel>
                        <IonInput value={title}
                                  onIonChange={(event) => setTitle(event.detail.value)}/>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Description</IonLabel>
                        <IonTextarea value={description}
                                     onIonChange={(event) => setDescription(event.detail.value)}/>
                    </IonItem>
                    <IonList>
                        <IonRadioGroup value={category} onIonChange={e => setCategory(e.detail.value)}>
                            <IonListHeader>Categorie</IonListHeader>
                            <IonItem>
                                <IonLabel>
                                    Vis
                                </IonLabel>
                                <IonRadio slot="start" value="vis" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Vlees
                                </IonLabel>
                                <IonRadio slot="start" value="Vlees" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Veggie
                                </IonLabel>
                                <IonRadio slot="start" value="Veggie" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Dessert
                                </IonLabel>
                                <IonRadio slot="start" value="Dessert" />
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Andere
                                </IonLabel>
                                <IonRadio slot="start" value="Andere" />
                            </IonItem>
                        </IonRadioGroup>
                    </IonList>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Voor hoeveel personen is dit recept?</IonLabel>
                        <IonTextarea value={numberOfPersons}
                                     onIonChange={(event) => setNumberOfPersons(event.detail.value)}/>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Ingrediënten</IonLabel>
                        <IonTextarea value={ingredients}
                                     onIonChange={(event) => setIngredients(event.detail.value)} placeholder={'Geef hier het aantal ingrediënten in voor ' + numberOfPersons  + ' personen, gescheiden door een komma.'} autoGrow={true}/>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Stappen</IonLabel>
                        <IonTextarea value={steps}
                                     onIonChange={(event) => setSteps(event.detail.value)} placeholder={'Geef hier de stappen om het recept te maken, gescheiden door twee blanco lijnen.'} autoGrow={true}/>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel position={"stacked"}>Foto</IonLabel>
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} hidden className={styles.img}/>
                        <img src={photo} alt=""
                             onClick={() => fileInputRef.current.click()}/>
                    </IonItem>
                </IonList>
                <IonRow class="ion-justify-content-center">
                    <IonButton onClick={handleAddRecipe}>Voeg toe</IonButton>
                    {/*<IonLoading/>*/}
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default AddRecipebackup;