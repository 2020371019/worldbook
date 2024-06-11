import { ENV } from "../utils/constants";

//Funcion para almacenar el token en el local storage
const setToken = (token) => {
    localStorage.setItem(ENV.STORAGE.TOKEN, token);
}

////Funcion para obtener el token del local storage
const getToken = () => {
    return localStorage.getItem(ENV.STORAGE.TOKEN);
}

//Funcion para eliminar el token del local storage
const removeToken = () => {
    return localStorage.removeItem(ENV.STORAGE.TOKEN);
}

export const storageController = {
    setToken,
    getToken,
    removeToken
}