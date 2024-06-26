import axios from "axios";
import { ENV } from "../utils/constants";

const register = async (readername, email, password) => {
  return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`, {
    readername,
    email,
    password,
    roles: ["CommonReader"],
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


export default {
  register,
  loginF,
  updateUser,

};
