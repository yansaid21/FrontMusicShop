import React, { useContext, useEffect, useState } from 'react';
import MusicLogo from "../../../../assets/svg/music-play-svgrepo-com.svg";
import "./ExtraNav.scss";
import { AuthContext } from '../../../../context';
import { User } from "../../../../api/user";

const ExtraNav = ({token}) => {
    const userController = new User();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserSession = async () => {
          try {
            console.log("antes de el getmelater en extra nav");
            const response = await userController.getMeLater(token);
            console.log("response en response",response);
            setUser(response);
          } catch (error) {
            console.log("Error al obtener la sesión del usuario en extranav", error);
            console.error("Error al obtener la sesión del usuario", error);
        }
    
        checkUserSession();
    }   
      },[user]);
      console.log("el token en extra nav",token);
 console.log("user en extra nav", user);
  return (
    <div className='ExtranavbarContainer'>
      <div className='navIcon'>
        <a href='/'>
          <img src={MusicLogo} alt='Logo' />
        </a>
      </div>
      <div className='navSection'>
        {/* <a href='#'>products</a>
        <a href='#'>Description</a>
        <a href='#'>Musical Partners</a> */}
      </div>
      {user ? (
        <p>{user.firstname}</p>
      ) : (
        <div className='loginButton'>
          <a href='login'>Log In</a>
        </div>
      )}
    </div>
  );
};

export default ExtraNav;
