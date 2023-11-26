import React, { useEffect, useState } from 'react'
import "./Section1.scss"
import Slider from '../Slider/Slider'
import { GetItems } from '../../api'



const Section1 = ({slidesData}) => {
  console.log("Slides data en section1",slidesData);
  const filteredData=slidesData.filter(item=> item.Showcase ===true)
  return (
    <div className='section1Container'>
      <Slider slidesData={filteredData}/>
    </div>
  )
}

export default Section1
