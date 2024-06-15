import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../services/token';
import { usersService } from '../services/users';
import { tokenExpired } from '../utils/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (token) => {
        try {
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    const getSession = () => {
        const token = storageController.getToken(); // Asegúrate de que esto devuelve el token de forma sincrónica
        if (!token) {
            logout();
            return;
        }
        if (tokenExpired(token)) {
            logout();
        } else {
            login(token);
        }
    };

    const updateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value
        });
    };

    const data = {
        user,
        email: user?.email, // Proporcionar el correo electrónico
        token: storageController.getToken(), // Proporcionar el token de forma sincrónica
        getSession,
        login,
        logout,
        updateUser,
    };

    if (loading) return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtiene el estado de autenticación

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
