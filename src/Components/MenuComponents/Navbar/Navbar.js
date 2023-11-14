import React, { useContext } from 'react'
import GuitarIcon from "../../../assets/svg/music-play-svgrepo-com.svg"
import "./Navbar.scss"
import { AuthContext } from '../../../context';
const Navbar = () => {
  const { user } = useContext(AuthContext);
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
        {user ? (
          <p>{user.firstname}</p>
        ):
        <div className='loginButton'>
            <a href='login'>Log In</a>
        </div>
        }
      
    </div>
  )
}

export default Navbar
