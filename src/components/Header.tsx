import React, { FC } from 'react';
import styles from './Header.module.css';
import {IonTitle} from "@ionic/react";

const Header: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <div className={styles.flexbox}>
                    <img src="assets/icon/logowit.png" alt="" className={styles.fg} ></img>
                    <IonTitle className={styles.name}>Brechts Kookboek</IonTitle>
                </div>
                <img src="assets/images/headerimage.png" alt="" className={styles.bg}></img>
            </div>

        </div>
    );
};

export default Header;