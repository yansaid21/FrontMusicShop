import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context";
import "./Login.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Auth } from '../../../api/auth';

const authController = new Auth();

const Login = () => {
  const { user } = useContext(AuthContext);
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    // Este código se ejecuta cuando 'user' se actualiza
    console.log("usuario después de ser seteado", user);

    // Puedes colocar aquí el código que depende de 'user' actualizado
    if (user && user.role === "Admin") {
      window.location.href = '/admin/Home';
    } else if (user && user.role === "Seller" && user.active === true) {
      window.location.href = '/seller/Home';
    }
  }, [user]);
  const onFinish = async () => {
    console.log('Received values of form: ', formData);
    try {
      setError("");
      const response = await authController.login(formData);
      console.log("response del login", response);
      if ( response.active === false) {
        window.location.href = '/nonVerified';
      }
      authController.setAccessToken(response.access);
      login(response);
      
    } catch (error) {
      setError("Error en el servidor con validación de formato de evolución");
    }
  };

  return (
    <div className="LogIn">
      <div className="LogInContainer">
        <div className="LogInTittle">Log In</div>

        <TextField
          className="UserName"
          required
          id="outlined-required"
          label="Email Address"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <TextField
          className="UserPassword"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        <div className="Check-Section">
          <Checkbox style={{ color: 'white' }} />
          Remember Me
        </div>
        <Button className="LogInButton" variant="contained" onClick={onFinish}>
          Log In
        </Button>
        <div className=" LinksLogIn">
          <a href="#">Forgot password?</a>
          <a href="signup">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
