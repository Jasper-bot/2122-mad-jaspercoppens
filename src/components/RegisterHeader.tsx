import React, { FC } from 'react';
import styles from './RegisterHeader.module.css';
import {IonTitle} from "@ionic/react";

const RegisterHeader: React.FC = () => {
    return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src="assets/icon/logowit.svg" alt="" className={styles.fg} ></img>
                    <img src="assets/images/logintopbarcanvas.jpg" alt="" className={styles.bg}></img>
                </div>
                <IonTitle className={styles.name}>Brechts Kookboek</IonTitle>
            </div>
    );
};

export default RegisterHeader;