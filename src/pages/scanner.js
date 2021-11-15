import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import api from "../service/api";
import { Paper, Button } from "@mui/material";

export default function Main() {
  const [scan, setScan] = useState();
  const [openReader, setOpenReader] = useState(false);
  const qrRef = useRef(null);

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = async (result) => {
    if (result) {
      if (isJson(result)) {
        const json_string = JSON.parse(result);
        const jsonObj = JSON.parse(json_string);

        console.log(jsonObj);

        console.log(jsonObj.id);
        await api.post("/users/check", { id: jsonObj._id }).then((response) => {
          console.log(response);
          if (response) {
            if (response.data.check) {
              toggleQrReader();
              console.log(response.data.data[0]);
              setScan(response.data.data[0]);
            } else {
              setScan(
                <>
                  <h4>Usuário não cadastrado</h4>
                </>
              );
            }
          }
        });
      }
    }
  };
  /*const onScanFile = () => {
    qrRef.current.openImageDialog();
  };*/
  const toggleQrReader = () => {
    setOpenReader(!openReader);
  };

  return (
    <>
      <Paper>
        <div className="grid-container">
          <Button
            style={{ marginTop: "10px" }}
            onClick={toggleQrReader}
            variant="contained"
            fullWidth
          >
            Escanear
          </Button>
          {openReader ? (
            <QrReader
              ref={qrRef}
              delay={300}
              style={{ width: "100%" }}
              onError={handleErrorFile}
              onScan={handleScanFile}
            />
          ) : (
            <></>
          )}
          {scan ? (
            <>
              <h3>ID:{scan._id}</h3>
              <h3>Nome:{scan.userName}</h3>
              <h3>Terceiro: {scan.outsorced === true ? "Sim" : "Não"}</h3>
              <h3>Area:{scan.area}</h3>
              <h4>Vouchers:</h4>
              <ul>
                {scan.vouchers.map((item) => {
                  return (
                    <>
                      <li>{item}</li>
                    </>
                  );
                })}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </Paper>
    </>
  );
}
