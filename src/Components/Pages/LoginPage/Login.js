import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context";
import "./Login.scss";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Auth } from "../../../api/auth";
import MusicLogo from "../../../assets/svg/music-play-svgrepo-com.svg";

const authController = new Auth();

const Login = () => {
  const { user } = useContext(AuthContext);
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFinish();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    //console.log("usuario después de ser seteado", user);
    if (user && user.role === "admin") {
      window.location.href = "/admin/home";
      //window.open('/admin/home', '_blank');
    } else if (user && user.role === "user" && user.active === true) {
      window.location.href = "/seller/home";
    }
  }, [user]);
  const onFinish = async () => {
    //console.log('Received values of form: ', formData);
    try {
      setError("");
      const response = await authController.login(formData);
      //console.log("response del login", response);
      if (response.active === false) {
        window.open("/nonVerified", "_blank");

        //  window.location.href = '/nonVerified';
      }
      authController.setAccessToken(response.access);
      console.log("response.access del login", response.access);
      login(response);
    } catch (error) {
      setError("Error en el servidor con validación de formato de evolución");
    }
  };

  return (
    <div className="LogIn">
      <div className="LogInContainer">
        <div className="LogInTittle">
          <div>Log In</div>
          <a href="/">
            <img src={MusicLogo} className="logoComeBack" />
          </a>
        </div>

        <TextField
          className="UserName"
          required
          id="outlined-required"
          label="Email Address"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onKeyDown={handleEnterKeyPress}
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
          onKeyDown={handleEnterKeyPress}
        />
        <Button className="LogInButton" variant="contained" onClick={onFinish} onEnter>
          Log In
        </Button>
        <div className=" LinksLogIn">
          <a href="forgot">Forgot password?</a>
          <a href="signup">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
