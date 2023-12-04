import React from 'react'
import MusicLogo from "../../../assets/svg/music-play-svgrepo-com.svg"
import "./Navbar.scss"
const Navbar = ({user}) => {
  return (
    <div className='navbarContainer'>
        <div className='navIcon'>
            <a href='/'>
            <img src={MusicLogo} alt='Logo'/>
            </a>
        </div>
        <div className='navSection'>
{/*             <a href='#'>products</a>
            <a href='#'>Description</a>
            <a href='#'>Musical Partners</a> */}
        </div>
        {user ? (
          user.role === "admin"?(
          <div className='loginButton'>
            <a href='/admin/home'>{user.firstname}</a>
            </div>  
          ):(
            <div className='loginButton'>
            <a href='/seller/home'>{user.firstname}</a>
            </div>
          )
        ):
        <div className='loginButton'>
            <a href='login'>Log In</a>
        </div>
        }
      
    </div>
  )
}

export default Navbar
