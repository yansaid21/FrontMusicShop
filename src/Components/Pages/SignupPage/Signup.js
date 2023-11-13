import React, { useEffect, useState } from "react";
import "./Signup.scss";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Alert, AlertTitle, Autocomplete, Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Auth } from "../../../api/auth";
import axios from "axios";

const authController = new Auth();

const Signup = () => {
  const [munDep, setMunDep] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        setMunDep(response.data);
        const uniqueDepartamentos = [
          ...new Set(response.data.map((item) => item.departamento)),
        ];
        setDepartamentos(uniqueDepartamentos);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  const handleDepartamentoChange = (event, value) => {
    setSelectedDepartamento(value);

    // Filtra los municipios según el departamento seleccionado
    const municipios = munDep
      .filter((item) => item.departamento === value)
      .map((item) => item.municipio);

    setMunicipiosFiltrados(municipios);
  };
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    document: "",
    documentType: "",
    departamento: "",
    municipio: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onFinish = async () => {
    console.log("Received values of form: ", formData);
    try {
      setError("");
      const response = await authController.register(formData);
      console.log("Respuesta del servidor:", response);
      console.log("response status",response.status);
      if (response._id != undefined) {
        console.log("Usuario creado exitosamente");
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          You have been registered successfully — <strong>enjoy it!</strong>
        </Alert>;
        window.location.href = "/verifyCode";
      } else {
        console.log("Código de estado inesperado:", response.status);
      }
      authController.setAccessToken(response.access);
      signup(response);
      console.log(response);
    } catch (error) {
      setError("Error en el servidor ");
    }
  };

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
            id="first-outlined-required"
            label="First Name"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
          />
          <TextField
            className="UserLastname"
            required
            id="second-outlined-required"
            label="Last Name"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
          />
        </div>
        <div className="emails">
          <TextField
            className="firstEmail"
            required
            id="third-outlined-required"
            label="Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <TextField
            className="secondEmail"
            required
            id="four-outlined-required"
            label="Repeat Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
        </div>
        <div className="documentAtributes">
          <Autocomplete
            className="documentT"
            disablePortal
            id="combo-box-document"
            options={documentTypes}
            sx={{ width: 300, color: "white" }}
            onChange={(e, value) =>
              handleInputChange("documentType", value.label)
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
                label="Document Type"
              />
            )}
          />
          <TextField
            className="documentText"
            required
            id="five-outlined-required"
            label="Document"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            onChange={(e) => handleInputChange("document", e.target.value)}
          />
        </div>
        <div className="locationInfo">
          <Autocomplete
            className="dep"
            disablePortal
            id="combo-box-departamento"
            options={departamentos}
            value={selectedDepartamento}
            onChange={(e, value) => {
              handleDepartamentoChange(e, value);
              handleInputChange("departamento", value);
            }}
            sx={{ width: 300, color: "white" }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }}
                label="Department"
              />
            )}
          />
          <Autocomplete
            className="mun"
            disablePortal
            id="combo-box-municipio"
            options={municipiosFiltrados}
            sx={{ width: 300, color: "white" }}
            onChange={(e, value) => handleInputChange("municipio", value)}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }}
                label="Municipality"
              />
            )}
          />
        </div>
        <div className="passwords">
          <TextField
            className="userPassword"
            required
            id="first-outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => handleInputChange("password", e.target.value)}
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            className="userPassword"
            required
            id="second-outlined-password-input"
            label="repeat password"
            type="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "white" } }} // Cambia el color del label
            InputProps={{ style: { color: "white" } }}
          />
        </div>
        <div className="Check-Section">
          <Checkbox required style={{ color: "white" }} />
          <a href="privacy" target="_blank">
            I have read and accepted the terms and conditions.
          </a>
        </div>
        <Button className="SignUpButton" variant="contained" onClick={onFinish}>
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default Signup;
