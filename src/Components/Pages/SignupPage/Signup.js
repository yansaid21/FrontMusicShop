import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Signup.scss";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Alert, AlertTitle, Autocomplete, Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Auth } from "../../../api/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const authController = new Auth();

const Signup = () => {
  const [munDep, setMunDep] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
  const [error, setError] = useState("");

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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDepartamentoChange = (event, value) => {
    setSelectedDepartamento(value);

    // Filter municipalities based on the selected department
    const municipios = munDep
      .filter((item) => item.departamento === value)
      .map((item) => item.municipio);

    setMunicipiosFiltrados(municipios);
  };

  const { signup } = useAuth();

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    repeatEmail: Yup.string().oneOf(
      [Yup.ref("email"), null],
      "Emails must match"
    ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    document: Yup.string().required("Document is required"),
    documentType: Yup.string().required("Document Type is required"),
    departamento: Yup.string().required("Department is required"),
    municipio: Yup.string().required("Municipality is required"),
    termsAndConditions: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      repeatEmail: "",
      password: "",
      repeatPassword: "",
      document: "",
      documentType: "",
      departamento: "",
      municipio: "",
      termsAndConditions: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError(""); // Limpiar errores al intentar enviar el formulario
        const response = await authController.register(values);

        if (response._id !== undefined) {
          console.log("Usuario creado exitosamente");
          // Aquí podrías mostrar una notificación o redirigir al usuario a otra página
          window.location.href = "/verifyCode";
        } else {
          console.log("Código de estado inesperado:", response.status);
          // Mostrar un mensaje de error o realizar alguna otra acción apropiada
        }

        authController.setAccessToken(response.access);
        signup(response);
        console.log(response);
      } catch (error) {
        setError("Error en el servidor");
        console.error("Error al enviar el formulario:", error);
        // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje de error
      }
    },
  });

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
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            {...formik.getFieldProps("firstname")}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            className="UserLastname"
            required
            id="second-outlined-required"
            label="Last Name"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            {...formik.getFieldProps("lastname")}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </div>
        <div className="emails">
          <TextField
            className="firstEmail"
            required
            id="third-outlined-required"
            label="Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            className="secondEmail"
            required
            id="four-outlined-required"
            label="Repeat Email"
            color="primary"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            {...formik.getFieldProps("repeatEmail")}
            error={
              formik.touched.repeatEmail && Boolean(formik.errors.repeatEmail)
            }
            helperText={formik.touched.repeatEmail && formik.errors.repeatEmail}
          />
        </div>
        <div className="documentAtributes">
          <Autocomplete
            className="documentT"
            disablePortal
            id="combo-box-document"
            options={documentTypes}
            value={formik.values.documentType}
            onChange={(e, value) => {
              formik.setFieldValue("documentType", value ? value.label : ""); // Asigna solo el valor de la etiqueta
            }}
            sx={{ width: 300, color: "white" }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }}
                label="Document Type"
                error={
                  formik.touched.documentType &&
                  Boolean(formik.errors.documentType)
                }
                helperText={
                  formik.touched.documentType && formik.errors.documentType
                }
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
            {...formik.getFieldProps("document")}
            error={formik.touched.document && Boolean(formik.errors.document)}
            helperText={formik.touched.document && formik.errors.document}
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
              formik.setFieldValue("departamento", value);
            }}
            sx={{ width: 300, color: "white" }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }}
                label="Department"
                error={
                  formik.touched.departamento &&
                  Boolean(formik.errors.departamento)
                }
                helperText={
                  formik.touched.departamento && formik.errors.departamento
                }
              />
            )}
          />

          <Autocomplete
            className="mun"
            disablePortal
            id="combo-box-municipio"
            options={municipiosFiltrados}
            value={formik.values.municipio}
            onChange={(e, value) => {
              formik.setFieldValue("municipio", value);
            }}
            sx={{ width: 300, color: "white" }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                InputLabelProps={{ style: { color: "white" } }}
                label="Municipality"
                error={
                  formik.touched.municipio && Boolean(formik.errors.municipio)
                }
                helperText={formik.touched.municipio && formik.errors.municipio}
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
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            className="userPassword"
            required
            id="second-outlined-password-input"
            label="Repeat password"
            type="password"
            autoComplete="current-password"
            {...formik.getFieldProps("repeatPassword")}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            helperText={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
        </div>

        <div className="linksSection">
        <div className="Check-Section">
          <Checkbox
            required
            style={{ color: "white" }}
            {...formik.getFieldProps("termsAndConditions")}
            />
          <span>
            I have read and accepted the{" "}
            <Link to="/privacy" target="_blank">
              terms and conditions
            </Link>
            .
          </span>
          {formik.touched.termsAndConditions &&
            formik.errors.termsAndConditions && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {formik.errors.termsAndConditions}
              </Alert>
            )}
        </div>
          <span className="loginLink"><Link to="/login" target="_blank">
              Log in
            </Link></span>
            </div>
        <Button
          className="SignUpButton"
          variant="contained"
          onClick={formik.handleSubmit}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default Signup;
