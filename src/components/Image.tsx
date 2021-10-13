import React, { FC } from 'react';
import './Image.css';

interface ImageProps {
    imagePath: string,
    description: string,
}

const Image: React.FC<ImageProps> = ({ imagePath , description}) => {
    return (
        <div>
            <div className="container">
                <img src={ imagePath } alt={ imagePath } max-height='150'></img>
                <p>{ description }</p>
            </div>
        </div>
    );
};

export default Image;