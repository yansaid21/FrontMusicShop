import React, { useEffect, useState } from 'react';
import Navbar from '../../MenuComponents/Navbar/Navbar';
import "./Home.scss";
import Section1 from '../../Sections/section1';
import Section2 from '../../Sections/Section2';
import Section3 from '../../Sections/Section3';
import GeneralFooter from '../../MenuComponents/GeneralFooter/GeneralFooter';
import { GetItems } from '../../../api';
import Loader from '../../Loader/Loader';

const Home = () => {
  const { itemsdata, fetchItemsData } = GetItems();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
  console.log("datasource en home",dataSource);
  return (
    <>
        {loading && dataSource.length===0? (
          <Loader/>
          ) : (
            <div className='homeContainer'>
            <Navbar/>
            <div className='sectionsContainer'>
            <Section1 slidesData={dataSource}/>
            <Section2/>
            <Section3/>
            </div>
            <GeneralFooter/>
          </div>
        )}
        </>
  );
}

export default Home;
