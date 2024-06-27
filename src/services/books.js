import { ENV } from "../utils/constants"
import { storageController } from "./token";
import axios from "axios";

export const createBook = async (bookData) => {
    try {
        
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.NEWBOOK}`;
        const token = storageController.getToken();
        if(!token){
            throw new Error('No se encontro el token de autentificación');
        }
        const response = await axios.post(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }, bookData,
        });
        return response.data;

    } catch (error) {
        console.log(token);
        console.error('Error al crear el producto', error);
        throw error;
    }
}