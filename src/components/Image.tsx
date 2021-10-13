import React, { FC } from 'react';

interface ImageProps {
    imagePath: string;
}

const Image: React.FC<ImageProps> = ({ imagePath }) => {
    return (
        <div>
            <p>{ imagePath }</p>
            <h1>Dit mag geen rood zijn</h1>
        </div>
    );
};

export default Image;