import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import api from "../service/api";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";

import QRCode from "qrcode";
import Checkbox from "@mui/material/Checkbox";

export default function Main() {
  const qrRef = useRef(null);
  const [qrcode, setQrCode] = useState("");

  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [queryName, setQueryName] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [queryMessage, setQueryMessage] = useState("");

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const generateQrCode = async (qrData) => {
    try {
      setQueryMessage("");
      const response = await QRCode.toDataURL(JSON.stringify(qrData));
      setQrCode(<img src={response} />);
    } catch (err) {
      throw err;
    }
  };

  const handleChangeName = (value) => {
    console.log(value);
    setName(value);
  };
  const handleChangeArea = (value) => {
    console.log(value);
    setArea(value);
  };
  const handleChangeNameQuery = (value) => {
    console.log(value);
    setQueryName(value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const sendData = async () => {
    if (name != "" && area != "") {
      await api
        .post("/users/register", {
          userName: name.toUpperCase(),
          outsorced: checked,
          area: area.toUpperCase()
        })
        .then((response) => {
          if (response) {
            setSendMessage("enviado com sucesso.");
          }
        });
    } else {
      setSendMessage("Preencha todos os campos");
    }
  };

  const getData = async () => {
    setQrCode("");
    console.log(queryName + "!= undefined");
    if (queryName != "") {
      let queryUpperCase = queryName.toUpperCase();
      await api.get(`/users/getByName/${queryUpperCase}`).then((response) => {
        if (response) {
          console.log(response.data[0]);
          if (response.data[0] != undefined) {
            const userObj = {
              _id: response.data[0]._id,
              userName: response.data[0].userName,
              outsorced: response.data[0].outsorced
            };
            const qrData = JSON.stringify(userObj);
            generateQrCode(qrData);
          } else {
            setQueryMessage("Usuário não cadastrado");
          }
        } else {
          setQueryMessage("Usuário não cadastrado");
        }
      });
    } else {
      setSendMessage("Informe um nome");
    }
  };

  return (
    <>
      <Grid container spacing={1} columns={8}>
        <Grid item xs={8}>
          <Paper>
            <div className="grid-container">
              <h1>Cadastro</h1>
              <div id="textfield">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  onChange={(e) => {
                    handleChangeName(e.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div id="textfield">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Area"
                  variant="outlined"
                  onChange={(e) => {
                    handleChangeArea(e.target.value);
                  }}
                  fullWidth
                />
              </div>

              <FormControlLabel
                label="Terceiro?"
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />

              <Button
                onClick={() => {
                  sendData();
                }}
                variant="contained"
                fullWidth
              >
                Cadastrar
              </Button>
              <div className={sendMessage != "" ? "message-area" : ""}>
                <h4>{sendMessage}</h4>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8} direction="column">
          <Paper>
            <div className="grid-container">
              <h1>QRcode</h1>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                onChange={(e) => {
                  handleChangeNameQuery(e.target.value);
                }}
                fullWidth
              />

              <Button
                style={{ marginTop: "10px" }}
                onClick={() => {
                  getData();
                }}
                variant="contained"
                fullWidth
              >
                Consultar
              </Button>
              <div className={queryMessage != "" ? "message-area" : ""}>
                <h4>{queryMessage}</h4>
              </div>
            </div>
            <div>{qrcode ? qrcode : <></>}</div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
