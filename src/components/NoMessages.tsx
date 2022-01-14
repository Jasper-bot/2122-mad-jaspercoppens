import React, { FC } from 'react';
import styles from './NoMessages.module.css';
import {IonTitle, IonIcon} from "@ionic/react";
import { alertCircleOutline } from 'ionicons/icons';

const NoMessages: React.FC = () => {
    return (
            <div className={styles.container}>
                <h2>Er zijn nog geen berichten verstuurd over dit recept.</h2>
                <IonIcon icon={alertCircleOutline} className={styles.icon}></IonIcon>
            </div>
    );
};

export default NoMessages;