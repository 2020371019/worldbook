import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../services/token';
import { usersService } from '../services/users';
import { tokenExpired } from '../utils/tokenExpired';


export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    //Crear el estado del usuario
    const [user, setUser] = useState(null);
    //Crear el estado de carga
    const [loading, setLoading] = useState(true);

    const login = async (token) => {
        try {
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
            setLoading(false);
            console.log(response);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null)
            setLoading(false)
        }catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getSession();
    }, [])

    const getSession = async () => {
        const token = await storageController.getToken();
        if(!token) {
                logout()
       // console.log('Token --> :', token);
       setLoading(false)
       return 
        } if (tokenExpired(token)){
            logout()
        }else{
            login(token)
        }
    }

    const upDateUser = (key, value) => {
        setUser({
            ...user,
            [key]:value
        })
    }
    const data = {
        user,
        getSession,
        login ,
        logout,
        upDateUser,
    }
    if (loading) return null;
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}