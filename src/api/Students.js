import axios from "axios";
import { useEffect, useState } from "react";

export const GetStudents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/admin/students");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  return data;
};

export const dataNotNull = () => {

  const data = GetStudents(); 

  const listStudenst = data.length > 0 ? data[0] : "";

  return listStudenst;
}
