import { tokenExpired } from "./tokenExpired";
import { storageController } from "../services/token";

export const authFetch = async (url, params) => {
    //console.log('Hola desde authFetch')
    const token = await storageController.getToken()

    const logout = () => {
        storageController.removeToken()
    }
    if(!token) {
        logout()
    } else {
        if(tokenExpired(token)){
            logout()
        }else{
            const options = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                return await fetch(url, options)
            } catch (error) {
                console.error(error)
            }
        }
    }
}