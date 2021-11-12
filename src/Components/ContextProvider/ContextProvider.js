import React, { createContext } from 'react';
import useFirebase from '../../Hooks/useFirebase';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const allContext = useFirebase();
    return (
        <Context.Provider value={allContext}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;