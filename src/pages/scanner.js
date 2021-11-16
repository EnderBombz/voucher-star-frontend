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

  const toggleQrReader = () => {
    setScan(null);
    setOpenReader(!openReader);
  };

  const color = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const stringHex = "#" + randomColor;
    return stringHex;
  };

  const lighter = (hex) => {
    let r, g, b, longo;
    hex = hex.replace("#", "");
    longo = hex.length > 3;

    r = longo
      ? parseInt(hex.substr(0, 2), 16)
      : parseInt(hex.substr(0, 1), 16) * 17;
    g = longo
      ? parseInt(hex.substr(2, 2), 16)
      : parseInt(hex.substr(1, 1), 16) * 17;
    b = longo
      ? parseInt(hex.substr(4, 2), 16)
      : parseInt(hex.substr(2, 1), 16) * 17;

    let lighter = (r * 299 + g * 587 + b * 114) / 1000;

    console.log(lighter);
    if (lighter > 128) {
      return "#000";
    } else {
      return "#fff";
    }
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
              style={{ width: "100%", marginTop: "10px" }}
              onError={handleErrorFile}
              onScan={handleScanFile}
            />
          ) : (
            <></>
          )}
          {scan ? (
            <>
              <h3>ID: {scan._id}</h3>
              <h3>Nome: {scan.userName}</h3>
              <h3>Terceiro: {scan.outsorced === true ? "Sim" : "Não"}</h3>
              <h3>Area: {scan.area}</h3>
              <h4>Vouchers:</h4>
              <div className="grid-container-center">
                <div className="voucher-list">
                  {scan.vouchers.map((item) => {
                    const randomColorHex = color();
                    const light = lighter(randomColorHex);
                    console.log(light);
                    return (
                      <div
                        style={{
                          borderRadius: "5px",
                          marginBottom: 5,
                          padding: 40,
                          backgroundColor: randomColorHex,
                          color: light
                        }}
                      >
                        <li>{item}</li>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Paper>
    </>
  );
}
