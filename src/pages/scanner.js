import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import api from "../service/api";
import { Paper, Button } from "@mui/material";
import BackBar from "./../components/navigation/backwardAppBar";

import AlertModal from "../components/modal/alert";
import QuestionModal from "../components/modal/question";

export default function Main() {
  const [scan, setScan] = useState();
  const [openReader, setOpenReader] = useState(false);
  const qrRef = useRef(null);

  const [currentData, setCurrentData] = useState();

  const [openQuestion, setOpenQuestion] = React.useState(false);
  const handleOpenQuestion = (item) => {
    setOpenQuestion(true);
    setCurrentData(item);
  };
  const handleCloseQuestion = () => {
    setOpenQuestion(false);
    setCurrentData(null);
  };

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const updateVoucherList = async () => {
    let newList = [];

    scan.vouchers.map((item) => {
      if (item != currentData) {
        console.log(item);
        newList.push(item);
      }
    });

    const jsonList = JSON.stringify(newList);
    const id = scan._id;
    clearScan();
    await api
      .post("/users/update-voucher", { list: jsonList, id: id })
      .then((response) => {
        if (response) {
          console.log(response.data);
        }
      });
  };
  const clearScan = () => {
    setScan(null);
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = async (result) => {
    if (result) {
      if (isJson(result)) {
        const json_string = JSON.parse(result);
        const jsonObj = JSON.parse(json_string);

        console.log(jsonObj);

        console.log(jsonObj._id);
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
      <BackBar path="/" title="Escaner de QRcode" />

      <QuestionModal
        open={openQuestion}
        handleClose={handleCloseQuestion}
        question={`Deseja liberar ${currentData}?`}
        action={() => {
          updateVoucherList();
          handleCloseQuestion();
        }}
      />
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
              <h3>Nome: {scan.userName}</h3>
              <h3>Terceiro: {scan.outsorced === true ? "Sim" : "Não"}</h3>
              <h3>Area: {scan.area}</h3>
              <h2>Vouchers:</h2>
              <div className="grid-container-center">
                <div className="voucher-list">
                  {scan.vouchers.length > 0 ? (
                    scan.vouchers.map((item) => {
                      const randomColorHex = color();
                      const light = lighter(randomColorHex);
                      console.log(light);
                      return (
                        <div
                          onClick={() => {
                            handleOpenQuestion(item);
                          }}
                          style={{
                            borderRadius: "5px",
                            marginBottom: 5,
                            padding: 40,
                            backgroundColor: randomColorHex,
                            color: light,
                            cursor: "pointer"
                          }}
                        >
                          <li>{item}</li>
                        </div>
                      );
                    })
                  ) : (
                    <h5>O usuário não possuí Vouchers</h5>
                  )}
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
