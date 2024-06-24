import axios from "axios";
import { ENV } from "../utils/constants";


export const getProducts = async () => {
    
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos', error);
        throw error;
    }

}



export const UpdateProducts = async (productId, updatedData) => {
    try {
        const response = await axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto', error);
        throw error;
    }
}

export const deleteProducts = async (productId, updatedData) => {
    try {
        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto', error);
        throw error;
    }
}

export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}`, newProduct);
        return response.data;
    } catch (error) {
        console.error('Error al agregar producto', error);
        throw error;
    }
}

export const getProductsByGenre = async (genre) => {
    
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.GETBYGENRE}/${genre}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los generos', error);
        throw error;
    }

}