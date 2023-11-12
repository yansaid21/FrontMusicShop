import React from "react";
import "./Signup.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete, Button } from "@mui/material";

const Signup = () => {
  const documentTypes = [
    { label: "CC" },
    { label: "passport" },
    { label: "TI" },
  ];
  return (
    <div className="SignUp">
      <div className="SignUpContainer">
        <div className="SignUpTittle">Sign Up</div>
        <div className="names">
          <TextField
            className="UserName"
            required
            id="outlined-required"
            label="First Name"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            className="UserLastname"
            required
            id="outlined-required"
            label="Last Name"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
        </div>
        <div className="Emails">
          <TextField
            className="firstEmail"
            required
            id="outlined-required"
            label="Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            className="secondEmail"
            required
            id="outlined-required"
            label="Repeat Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />

          <div className="documentAtributes">
            <Autocomplete
              className="documentT"
              disablePortal
              id="combo-box-demo"
              options={documentTypes}
              sx={{ width: 300, color: "white" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
                  label="Document Type"
                />
              )}
            />
            <TextField
              className="documentText"
              required
              id="outlined-required"
              label="Document"
              color="primary"
              InputLabelProps={{ style: { color: "white" } }} 
              InputProps={{ style: { color: "white" } }}
            />
          </div>
        </div>
        <div className="passwords">
          <TextField
            className="userPassword"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            className="userPassword"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
        </div>
        <div className="Check-Section">
          <Checkbox style={{ color: 'white' }}/>
          <a href="privacy" target="_blank">
            I have read and accepted the terms and conditions.
          </a>
        </div>
        <Button className="SignUpButton" variant="contained">
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default Signup;
