// GetSellers.js
import axios from "axios";
import { useEffect, useState } from "react";
import { ENV } from '../utils/constants';


const CONTENT_TYPE_JSON = "application/json";

export const GetItems = (token) => {
  const [itemsdata, setItemsData] = useState([]);

  useEffect(() => {
    fetchItemsData();
  }, [token]);

    const fetchItemsData = async () => {
      try {
        if (!token) {
          console.error("Token is null");
          return;
        }
    
        const response = await axios.get(`${ENV.BASE_PATH}/${ENV.API_ROUTES.ITEMS}`, {
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${token}`,
          },
        });
        setItemsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };    

  return { itemsdata, fetchItemsData };
};
