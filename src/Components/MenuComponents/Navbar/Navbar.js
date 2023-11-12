import React from 'react'
import GuitarIcon from "../../../assets/svg/music-play-svgrepo-com.svg"
import "./Navbar.scss"
const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <div className='navIcon'>
            <a href='/'>
            <img src={GuitarIcon} alt='Logo'/>
            </a>
        </div>
        <div className='navSection'>
            <a href='#'>products</a>
            <a href='#'>Description</a>
            <a href='#'>Musical Partners</a>
        </div>
        <div className='loginButton'>
            <a href='#'>Log In</a>
        </div>
      
    </div>
  )
}

export default Navbar
