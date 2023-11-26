
import axios from "axios";
import { useEffect, useState } from "react";
import { ENV } from '../utils/constants';


const CONTENT_TYPE_JSON = "application/json";

export const GetItems = () => {
  const [itemsdata, setItemsData] = useState([]);

  useEffect(() => {
    fetchItemsData();
  }, []);

    const fetchItemsData = async () => {
      try {
        const response = await axios.get(`${ENV.BASE_PATH}/${ENV.API_ROUTES.ITEMS}`, {      
        });
        setItemsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };    

  return { itemsdata, fetchItemsData };
};
