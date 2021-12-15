import React, {useContext} from 'react';

export const DataContext = React.createContext(null);

export function UseData(){
    return useContext(DataContext);
}