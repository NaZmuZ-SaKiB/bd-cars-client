import React, { useContext } from 'react';
import { Context } from '../Components/ContextProvider/ContextProvider';

const useAuth = () => {
    const auth = useContext(Context);
    return auth;
};

export default useAuth;