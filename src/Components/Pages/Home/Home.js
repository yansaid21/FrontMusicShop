import React from 'react'
import Navbar from '../../MenuComponents/Navbar/Navbar'
import "./Home.scss"
import Section1 from '../../Sections/section1'
import Section2 from '../../Sections/Section2'
import Section3 from '../../Sections/Section3'
import Footer from '../../MenuComponents/Footer/Footer'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Navbar/>
      <div className='sectionsContainer'>
      <Section1/>
      <Section2/>
      <Section3/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
