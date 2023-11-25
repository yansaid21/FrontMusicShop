import axios from 'axios';
import { ENV } from "../utils/constants";

const ITEM = ENV.API_ROUTES.ITEM;
const CONTENT_TYPE_JSON = "application/json";

export class Item {
  baseApi = ENV.BASE_PATH;

  async NewItem(data,accessToken) {
    const accessTokenString = accessToken;
    console.log("entro al deactivateItem");
    try {
      const response = await axios.post(
        `${ENV.BASE_PATH}/item`,
        data, 
        {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessTokenString}`,
          },
        }
      );
  
      console.log("nuevo item creado: ",response.data);
      return response.data;
    } catch (error) {
        console.log("error al crear el item",error);
      console.error(error);
      throw error;
    }
  }

  async modifyItem(data,accessToken,_id) {
    const accessTokenString = accessToken;
    console.log("entro al modifyItem");
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/item/${_id}`,
        data, // Agregar el cuerpo que deseas enviar en el patch
        {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessTokenString}`,
          },
        }
      );
  
      console.log("item modificado: ",response.data);
      return response.data;
    } catch (error) {
        console.log("error al modificar el item",error);
      console.error(error);
      throw error;
    }
  }

  async getItem(accessToken) {
    //console.log("estoy en getme api/user.js", typeof accessToken);
    const accessTokenString = accessToken; // Convertir el objeto a una cadena de texto
    //console.log(typeof accessTokenString);
    //console.log("el accesstokenstring", accessTokenString);

    try {
      const response = await axios.get(`${ENV.BASE_PATH}/${ITEM}`, {
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
  async deactivateItem(accessToken, _id) {
    const accessTokenString = accessToken;
    console.log("entro al deactivateItem");
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/item/${_id}`,
        { Active: false }, // Agregar el cuerpo que deseas enviar en el patch
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
  async activateItem(accessToken, _id) {
    const accessTokenString = accessToken;
    console.log("entro al activateItem");
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/item/${_id}`,
        { Active: true }, // Agregar el cuerpo que deseas enviar en el patch
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
  async ShowItem(accessToken,_id) {
    const accessTokenString = accessToken;
  
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/item/${_id}`,
        { Showcase: true }, // Agregar el cuerpo que deseas enviar en el patch
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
  async NotShowItem(accessToken, _id) {
    const accessTokenString = accessToken;
  
    try {
      const response = await axios.patch(
        `${ENV.BASE_PATH}/item/${_id}`,
        { Showcase: false }, // Agregar el cuerpo que deseas enviar en el patch
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
