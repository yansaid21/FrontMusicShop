// GetSellers.js
import axios from "axios";
import { useEffect, useState } from "react";
import { ENV } from '../utils/constants';

const USER_ME_ROUTE = ENV.API_ROUTES.USER_ME;
const CONTENT_TYPE_JSON = "application/json";

export const GetSellers = (token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [token]);

    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token is null");
          return;
        }
    
        const response = await axios.get(`${ENV.BASE_PATH}/${ENV.API_ROUTES.SELLERS}`, {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };    

  return { data, fetchData }; // Devolvemos tanto la lista de sellers como la función fetchData
};
