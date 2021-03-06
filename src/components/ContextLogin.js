import {createContext} from 'react';

export const defaultObject = {
    isUserLogged : false,
    toggleUserLogged: () => {},
    username: '',
    changeUsername: () => {},
    cleanUsername: () => {}
}

export const ContextLogin = createContext(defaultObject)