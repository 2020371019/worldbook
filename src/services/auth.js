import axios from "axios";
import { ENV } from "../utils/constants";

const register = async (readername, email, password) => {
  return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`, {
    readername,
    email,
    password,
    roles: ['user'],
  });
};

const loginF = async (email, password) => {
  return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`, {
    email,
    password,
  });
};


export const updateUser = async (userId, newPassword) => {
  try {
    const response = await axios.put(
      `${ENV.API_URL}/${ENV.ENDPOINTS.CHANGE_PASSWORD}/${userId}`,
      { "password": newPassword }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la contraseña ', error);
    throw error;
  }
};



export const upUser = async (userId, name, correo) => {
  try {
    const response = await axios.put(
      `${ENV.API_URL}/${ENV.ENDPOINTS.CHANGE_DATA_USER}/${userId}`,
      { 
        readername: name,
        email: correo,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar los datos ', error);
    throw error;
  }
};


export default {
  register,
  loginF,
  updateUser,
  upUser

};
