import axios from "axios";
import { ENV } from "../utils/constants";

const products_all = async() => {
    return axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}`); 
};


export default {
    products_all
}