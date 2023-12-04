import React, { useEffect, useState } from 'react';
import './VerifyCode.scss';  // Asegúrate de tener un archivo CSS para estilar tu componente si es necesario
import { TextField } from '@mui/material';


import { Auth } from "../../../api/auth";
import { User } from "../../../api/user";
import { Navigate } from 'react-router-dom';

  const userController = new User();
  const authController = new Auth();
  
  const VerifyCode = () => {
    const [user, setUser] = useState(null);
    const [token,setToken] =useState(null)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const accessToken = await authController.getAccessToken();
        const response = await userController.getMeLater(accessToken);
        setUser(response);
        setToken(accessToken);
      } catch (error) {
        console.error("Error al obtener la sesión del usuario", error);
      }
    };

    checkUserSession();
  }, []);
/*   useEffect(()=>{
    if(ready){

    }
  },[ready]) */

  const [verificationCode, setVerificationCode] = useState('');
  const [ready,setReady] = useState(null)


  const handleVerificationCodeChange = async (event) => {
    setVerificationCode(event.target.value);
    console.log("valor capturado: ", event.target.value);
    console.log("valor del codigo de usuario: ",user.verifyCode);
    if(user.verifyCode === event.target.value){
      console.log("entrando al navigate to");
      await userController.activateUser(token,user._id)
      window.location.href = "/verified"; 
    }else{
      console.log("mi perro no son iguales, revise");
    }

  };

  return (
    <div className='verifyContainer'>
    <div className="c-email">
      <div className="c-email__header">
        <h1 className="c-email__header__title">Your Verification Code</h1>
      </div>
      <div className="c-email__content">
        <p className="c-email__content__text text-title">
          Enter your 6 digits verification code in field:
        </p>
        <div className="c-email__code">
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
        />
        </div>
        <p className="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 30 minutes</p>
      </div>
      <div className="c-email__footer"></div>
    </div>
    </div>
  );
}

export default VerifyCode;
