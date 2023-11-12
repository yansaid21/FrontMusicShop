import React from "react";
import "./Login.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

const Login = () => {
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
        />
        <TextField
            className="UserPassword"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "white" } }} 
              InputProps={{ style: { color: "white" } }}
        />
        <div className="Check-Section">
  <Checkbox
    style={{ color: 'white' }} // Establece el color blanco para el icono del Checkbox
  />
  Remember Me
</div>
        <Button className="LogInButton" variant="contained">
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
