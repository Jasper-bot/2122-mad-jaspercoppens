import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonListHeader,
    IonPage, IonRadio, IonRadioGroup,
    IonRow, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/react';
import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import * as yup from "yup";
import {FieldArray, Formik, Field} from 'formik';
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
import {removeWhitespaceFromArray, stringToArrayByComma, stringToArrayByNewline} from "../helperfunctions";

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

const validationSchema = yup.object({
    title: yup
        .string()
        .nullable()
        .min(5, "Title should at least be 5 characters long")
        .required("Title is required"),
    description: yup
        .string()
        .nullable()
        .min(20, "Description should at least be 20 characters long")
        .required("Description is required"),
    category: yup
        .mixed()
        .oneOf(['Vis', 'Vlees', 'Veggie', 'Dessert', 'Andere'], "The category is invalid")
        .required("Category is required"),
    numberOfPersons: yup
        .number()
        .positive("Aantal personen moet een positief getal zijn.")
        .integer("Aantal personen moet een positief getal zijn.")
        .required("Aantal personen is verplicht."),
    ingredients: yup
        .array()
        .of(yup.string()
            .min(2, "een ingredient moet uit minstens 2 karakters bestaan.")
            .required("een ingrediënt kan niet leeg zijn."))
        .min(2, "Je recept heeft moet minstens uit twee ingrediënten bestaan.")
        .required("Ingrediënten is verplicht."),
    steps: yup
        .array()
        .of(yup.string()
            .min(2, "een stap moet uit minstens 2 karakters bestaan")
            .required("een stap kan niet leeg zijn."))
        .min(2, "Je recept heeft moet minstens uit twee stappen bestaan.")
        .required("Stappen is verplicht."),
})

const AddRecipe: React.FC = () => {
    const [photo, setPhoto] = useState('/assets/images/addImage.png');
    const {userId, userName}  = useAuth();
    const history = useHistory();
    const fileInputRef = useRef<HTMLInputElement>();

    useEffect(() => () => {
        if(photo.startsWith('blob:')){
            URL.revokeObjectURL(photo);
        }
    }, [photo]);

    const handleAddRecipe = async(data) => {
        const recipesRef = db.collection('recipes');
        const recipeData = {
            title: data.title,
            description: data.description,
            userId: userId,
            userName: userName,
            photo: photo,
            steps: removeWhitespaceFromArray(data.steps),
            ingredients: removeWhitespaceFromArray(data.ingredients),
            category: data.category
        };

        const recipeRef = await recipesRef.add(recipeData);
        if (recipeData.photo.startsWith('blob:')) {
             await savePhoto(photo, recipeRef.id);
        }
        history.goBack();
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

    const handleReset = () => {

    }

    return (
        <IonPage>
            <IonHeader>
                <Header />
            </IonHeader>
                <Formik
                    initialValues={{
                        title: null,
                        description: null,
                        category: null,
                        numberOfPersons: null,
                        ingredients: [],
                        steps: []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async(values, {resetForm}) => {
                        await handleAddRecipe(values);
                        setPhoto('/assets/images/addImage.png');
                        resetForm();
                    }}
                    onReset={handleReset}
                >
                    {formikProps => (
                        <IonContent class="ion-padding">
                            <form onSubmit={formikProps.handleSubmit}>
                                <IonItem lines="inset">
                                    <IonLabel position={"stacked"}>Title</IonLabel>
                                    <IonInput
                                        type="text"
                                        name="title"
                                        placeholder="Bijvoorbeeld: Tomatensoep"
                                        value={formikProps.values.title}
                                        onIonChange={formikProps.handleChange}/>
                                </IonItem>
                                <IonLabel  color="danger" className={styles.small}>
                                    {formikProps.touched.title && formikProps.errors.title}
                                </IonLabel>
                                <IonItem lines="inset">
                                    <IonLabel position={"stacked"}>Description</IonLabel>
                                    <IonTextarea
                                        name="description"
                                        placeholder="Bijvoorbeeld: Een oerklassieker die iedereen lust!"
                                        value={formikProps.values.description}
                                        onIonChange={formikProps.handleChange}/>
                                </IonItem>
                                <IonLabel  color="danger" className={styles.small}>
                                    {formikProps.touched.description && formikProps.errors.description}
                                </IonLabel>
                                <IonItem lines="inset">
                                    <IonLabel position="stacked">Categorie</IonLabel>
                                    <IonSelect
                                        name="category"
                                        value={formikProps.values.category}
                                        onIonChange={formikProps.handleChange}
                                        >
                                        <IonSelectOption value="Vlees">Vlees</IonSelectOption>
                                        <IonSelectOption value="Vis">Vis</IonSelectOption>
                                        <IonSelectOption value="Veggie">Veggie</IonSelectOption>
                                        <IonSelectOption value="Dessert">Dessert</IonSelectOption>
                                        <IonSelectOption value="Andere">Andere</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                <IonLabel color="danger" className={styles.small}>
                                    {formikProps.touched.category && formikProps.errors.category}
                                </IonLabel>
                                <IonItem lines="inset">
                                    <IonLabel position={"stacked"}>Voor hoeveel personen is dit recept?</IonLabel>
                                    <IonInput
                                        name="numberOfPersons"
                                        placeholder={"bijvoorbeeld: 4"}
                                        value={formikProps.values.numberOfPersons}
                                        onIonChange={formikProps.handleChange}/>
                                </IonItem>
                                <IonLabel color="danger" className={styles.small}>
                                    {formikProps.touched.numberOfPersons && formikProps.errors.numberOfPersons}
                                </IonLabel>
                                <IonItem  lines="none">
                                    <IonLabel position={"stacked"}>Ingrediënten</IonLabel>
                                    <FieldArray
                                        name="ingredients"
                                        render={arrayHelpers => (
                                            <div className={"ion-padding-vertical"}>
                                                {formikProps.values.ingredients && formikProps.values.ingredients.length > 0 ? (
                                                    formikProps.values.ingredients.map((ingredient, index) => (
                                                        <div key={index}>
                                                            <Field name={`ingredients.${index}`} />
                                                            <IonButton
                                                                type="button"
                                                                color={"secondary"}
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                -
                                                            </IonButton>
                                                            <IonButton
                                                                type="button"
                                                                color={"secondary"}
                                                                onClick={() => arrayHelpers.insert(index, '')}
                                                            >
                                                                +
                                                            </IonButton>
                                                        </div>

                                                    ))
                                                ) : (
                                                    <IonButton type="button" color={"secondary"} onClick={() => arrayHelpers.push('')}>
                                                        {/* show this when user has removed all friends from the list */}
                                                       Voeg ingrediënt toe
                                                    </IonButton>
                                                )}
                                            </div>
                                        )}
                                    />
                                </IonItem>
                                <IonLabel color="danger"  className={[styles.small, "ion-padding"].join(" ")}>
                                    {formikProps.touched.ingredients && formikProps.errors.ingredients}
                                </IonLabel>
                                <IonItem  lines="none">
                                    <IonLabel position={"stacked"}>Stappen</IonLabel>
                                    <FieldArray
                                        name="steps"
                                        render={arrayHelpers => (
                                            <div className={"ion-padding-vertical"}>
                                                {formikProps.values.steps && formikProps.values.steps.length > 0 ? (
                                                    formikProps.values.steps.map((step, index) => (
                                                        <div key={index}>
                                                            <Field name={`steps.${index}`} />
                                                            <IonButton
                                                                type="button"
                                                                color={"secondary"}
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                -
                                                            </IonButton>
                                                            <IonButton
                                                                type="button"
                                                                color={"secondary"}
                                                                onClick={() => arrayHelpers.insert(index, '')}
                                                            >
                                                                +
                                                            </IonButton>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <IonButton type="button" color={"secondary"} onClick={() => arrayHelpers.push('')}>
                                                        {/* show this when user has removed all friends from the list */}
                                                        Voeg stap toe
                                                    </IonButton>
                                                )}
                                            </div>
                                        )}
                                    />
                                </IonItem>
                                <IonLabel color="danger" className={[styles.small, "ion-padding"].join(" ")} position={"stacked"}>
                                    {formikProps.touched.steps && formikProps.errors.steps}
                                </IonLabel>
                                <IonItem lines="none">
                                    <IonLabel position={"stacked"}>Foto</IonLabel>
                                    <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} hidden className={styles.img}/>
                                    <img src={photo} alt=""
                                         onClick={() => fileInputRef.current.click()}/>
                                </IonItem>
                                <IonItem>
                                    <IonButton type="submit">Voeg recept toe</IonButton>
                                </IonItem>
                            </form>

                            {/*<div style={{ fontSize: "smaller" }}>*/}
                            {/*    <p>VALUES</p>*/}
                            {/*    <pre>{JSON.stringify(formikProps.values, null, 2)}</pre>*/}

                            {/*    <p>ERRORS</p>*/}
                            {/*    <pre>{JSON.stringify(formikProps.errors, null, 2)} </pre>*/}
                            {/*</div>*/}
                        </IonContent>
                    )}

                </Formik>
                {/*<IonRow class="ion-justify-content-center">*/}
                {/*    <IonButton onClick={handleAddRecipe}>Voeg toe</IonButton>*/}
                {/*    /!*<IonLoading/>*!/*/}
                {/*</IonRow>*/}

        </IonPage>
    );
};

export default AddRecipe;