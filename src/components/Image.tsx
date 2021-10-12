import React, { FC } from 'react';

interface ImageProps {
    imagePath: string;
}

const Image: React.FC<ImageProps> = ({ name }) => {
    return (
        <div className="container">
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
    );
};

export default Image;