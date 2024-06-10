import axios from "axios";
import { ENV } from "../utils/constants";


const register = async(readername, email, password) => {
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

    export default {
        register,
        loginF
    }