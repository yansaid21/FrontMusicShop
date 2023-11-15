import axios from 'axios';
import { ENV } from "../utils/constants";

const USER_ME_ROUTE = ENV.API_ROUTES.USER_ME;
const CONTENT_TYPE_JSON = "application/json";

export class User {
  baseApi = ENV.BASE_PATH;

  async getMe(accessToken) {
    //console.log("estoy en getme api/user.js", typeof accessToken);
    const accessTokenString = accessToken.access; // Convertir el objeto a una cadena de texto
    //console.log(typeof accessTokenString);
    //console.log("el accesstokenstring", accessTokenString);

    try {
      const response = await axios.get(`${ENV.BASE_PATH}/${USER_ME_ROUTE}`, {
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessTokenString}`,
        },
      });

      //console.log("respuesta despues del getMe", response.data);
      return response.data; // Devuelve solo los datos de la respuesta, ya que axios devuelve un objeto con la propiedad 'data'
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getMeLater(accessToken) {
    //console.log("estoy en getme api/user.js", typeof accessToken);
    const accessTokenString = accessToken; // Convertir el objeto a una cadena de texto
    //console.log(typeof accessTokenString);
    //console.log("el accesstokenstring", accessTokenString);

    try {
      const response = await axios.get(`${ENV.BASE_PATH}/${USER_ME_ROUTE}`, {
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessTokenString}`,
        },
      });

      //console.log("respuesta despues del getMe", response.data);
      return response.data; // Devuelve solo los datos de la respuesta, ya que axios devuelve un objeto con la propiedad 'data'
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deactivateUser(accessToken, _id) {
    const accessTokenString = accessToken;
  
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/USER/${_id}`,
        { active: false }, // Agregar el cuerpo que deseas enviar en el patch
        {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessTokenString}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async activateUser(accessToken,_id) {
    const accessTokenString = accessToken;
  
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/USER/${_id}`,
        { active: true }, // Agregar el cuerpo que deseas enviar en el patch
        {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessTokenString}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
    
}
