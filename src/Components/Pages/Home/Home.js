import React, { useEffect, useState } from 'react';
import Navbar from '../../MenuComponents/Navbar/Navbar';
import "./Home.scss";
import Section1 from '../../Sections/section1';
import Section2 from '../../Sections/Section2';
import Section3 from '../../Sections/Section3';
import GeneralFooter from '../../MenuComponents/GeneralFooter/GeneralFooter';
import { GetItems } from '../../../api';
import Loader from '../../Loader/Loader';
import { Auth } from "../../../api/auth";
import { User } from "../../../api/user";


const Home = () => {
  const userController = new User();
  const authController = new Auth();
  const { itemsdata, fetchItemsData } = GetItems();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await authController.getAccessToken();
        const response = await userController.getMeLater(accessToken);
        setUser(response);
      } catch (error) {
        console.error("Error al obtener la sesión del usuario", error);
      }
      try {
        setLoading(true);
        await fetchItemsData();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    setDataSource(itemsdata);
  }, [itemsdata]);
  /*   console.log("datasource en home",dataSource); */
  const filterData = dataSource.filter(item => item.Active ===true)
  /*   console.log("filterData: ", filterData); */
  
  console.log("este es el user en home",user);
  return (
    <>
        {loading && dataSource.length===0? (
          <Loader/>
          ) : (
            <div className='bigContainer'>
            <Navbar user={user}/>
            <div className='homeContainer'>
              <div className='navHome'>
              </div>
            <div className='sectionsContainer'>
            <Section1 slidesData={dataSource}/>
            <Section2 allItems={filterData}/>
            <Section3/>
            </div>
            <GeneralFooter/>
          </div>
            </div>
        )}
        </>
  );
}

export default Home;
