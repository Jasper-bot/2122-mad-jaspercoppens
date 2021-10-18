import React, { FC } from 'react';
import styles from './Image.module.css';

interface ImageProps {
    imagePath: string,
    description: string,
}

const Image: React.FC<ImageProps> = ({ imagePath , description}) => {
    return (
        <div>
            <div className={styles.container}>
                <img src={ imagePath } alt={ imagePath } max-height='150' className={styles.image}></img>
                <p className={styles.description}>{ description }</p>
            </div>
        </div>
    );
};

export default Image;