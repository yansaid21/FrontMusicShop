import React from 'react'
import "./PQRSF.scss"
import Navbar from '../../MenuComponents/Navbar/Navbar'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const PQRSF = () => {
  return (
    <>
      <Navbar/>
    <div className='pqrsfContainer'>
      <div className='pqrsfTextContainer'>
        <DatePicker/>
      </div>
    </div>
    </>
  )
}

export default PQRSF
