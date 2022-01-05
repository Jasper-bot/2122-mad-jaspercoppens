import React, { FC } from 'react';
import styles from './Header.module.css';
import {IonTitle} from "@ionic/react";

const Header: React.FC = () => {
    return (
            <div className={styles.logo}>
                <div className={styles.flexbox}>
                    <img src="assets/icon/logowit.svg" alt="logo brechts kookboek" className={styles.logokookboek}></img>
                    <IonTitle className={styles.name}>Brechts Kookboek</IonTitle>
                </div>
                <img src="assets/images/headerimage.png" alt="achtergrond van logo" className={styles.bg}></img>
            </div>
    );
};

export default Header;