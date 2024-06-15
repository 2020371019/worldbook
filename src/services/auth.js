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

const changePassword = async (email, newPassword, token) => {
  return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.CHANGE_PASSWORD}`, 
    { email, newPassword },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
};

const updateUser = async (userId, data, token) => {
  return axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export default {
  register,
  loginF,
  changePassword,
  updateUser
};
