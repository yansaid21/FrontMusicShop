import React, { useState } from "react";
import "./PQRSF.scss";
import Navbar from "../../MenuComponents/Navbar/Navbar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Button, TextField } from "@mui/material";
import ExtraNav from "../../MenuComponents/Navbar/ExtraNav/ExtraNav";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PQRSF = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    personType: "",
    emailAddress: "",
    documentType: "",
    phoneNumber: "",
    documentNumber: "",
    editorData: "<p></p>",
  });

  const onFinish = () => {
    // You can access form data from the formData state
    console.log("Form Data:", formData);
    window.location.href = "/tpqrsf";
    // Perform other actions with the form data as needed
  };

  return (
    <>
      <ExtraNav />
      <div className="pqrsfContainer">
        <div className="pqrsfTextContainer">
          <div className="textRow">
            <TextField
              sx={{ width: 300 }}
              className="UserName"
              required
              id="outlined-required"
              label="First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              sx={{ width: 300 }}
              className="UserPhone"
              required
              id="outlined-required"
              label="Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <div className="textRow">
            <DatePicker
              sx={{ width: 300 }}
              onChange={(date) =>
                setFormData({ ...formData, dateOfBirth: date })
              }
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userType}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Person" />}
              onChange={(e, value) =>
                setFormData({ ...formData, personType: value })
              }
            />
          </div>
          <div className="textRow">
            <TextField
              sx={{ width: 300 }}
              className="UserName"
              required
              id="outlined-required"
              label="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, emailAddress: e.target.value })
              }
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                formData.personType.label === "legal entity"
                  ? juridicDocument
                  : formData.personType.label === "natural"
                  ? userDocuments
                  : blancSpace
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Document Type" />
              )}
              onChange={(e, value) =>
                setFormData({ ...formData, documentType: value })
              }
            />
          </div>
          <div className="textRow">
            <TextField
              sx={{ width: 300 }}
              className="UserPhone"
              required
              id="outlined-required"
              label="Phone Number"
              onChange={(e,value) =>
                setFormData({ ...formData, phoneNumber: value? value.label: ""})
              }
            />
            <TextField
              sx={{ width: 300 }}
              className="UserPhone"
              required
              id="outlined-required"
              label={
                formData.personType.label === "legal entity"
                  ? "NIT"
                  : formData.personType.label === "natural"
                  ? "Document"
                  : ""
              }
              onChange={(e,value) =>
                setFormData({ ...formData, documentNumber: value ? value.label : "" })
              }
            />
          </div>
          <div className="textRow">
            <CKEditor
              sx={{ width: 300 }}
              editor={ClassicEditor}
              data={formData.editorData}
              onReady={(editor) => {
                // You can perform actions when the editor is ready
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData({ ...formData, editorData: data });
              }}
              onBlur={(event, editor) => {
                // You can perform actions when the editor loses focus
              }}
              onFocus={(event, editor) => {
                // You can perform actions when the editor gains focus
              }}
            />
          </div>
          <div className="textRow">
            <Button
              className="LogInButton"
              variant="contained"
              onClick={onFinish}
              onEnter
            >
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PQRSF;

const userType = [{ label: "natural" }, { label: "legal entity" }];
const userDocuments = [{ label: "CC" }, { label: "CE" }, { label: "PEP" }];
const juridicDocument = [{ label: "NIT" }];
const blancSpace = [{ label: " " }];
const RequestType = [
  { label: "Request" },
  { label: "Complaint" },
  { label: "Claim" },
  { label: "Suggestion" },
  { label: "Congratulation" },
];
