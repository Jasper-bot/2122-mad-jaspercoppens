import React, { FC } from 'react';

interface ImageProps {
    imagePath: string;
}

const Image: React.FC<ImageProps> = ({ imagePath }) => {
    return (
        <div className="container">
            <p>{ imagePath }</p>
        </div>
    );
};

export default Image;