import React, { FC } from 'react';
import styles from './Image.module.css';
import {IonImg, IonItem} from "@ionic/react";

interface ImageProps {
    imagePath: string,
    description: string,
    linkPath: string;
}

const Image: React.FC<ImageProps> = ({ imagePath , description, linkPath}) => {
    return (
        <IonItem routerLink={`/my/${linkPath}`} lines="none">
            <div className={styles.imagecontainer}>
                <IonImg src={ imagePath } alt={ imagePath } max-height='150' className={styles.image}></IonImg>
                <p className={styles.description}>{ description }</p>
            </div>
        </IonItem>
    );
};

export default Image;