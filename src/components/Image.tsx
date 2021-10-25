import React, { FC } from 'react';
import styles from './Image.module.css';
import {IonItem} from "@ionic/react";

interface ImageProps {
    imagePath: string,
    description: string,
    linkPath: string;
}

const Image: React.FC<ImageProps> = ({ imagePath , description, linkPath}) => {
    return (
        <IonItem routerLink={`/my/${linkPath}`}>
            <div className={styles.container}>
                <img src={ imagePath } alt={ imagePath } max-height='150' className={styles.image}></img>
                <p className={styles.description}>{ description }</p>
            </div>
        </IonItem>
    );
};

export default Image;