import React from "react";
import voucherLogo from "./../images/VOUCHER_STAR_LOGO.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleScanner = () => {
    navigate("/scanner");
  };
  const handleGenerator = () => {
    navigate("/generator");
  };

  return (
    <>
      <div className="main-logo">
        <img src={voucherLogo} />
      </div>
      <div>
        <div className="main-button">
          <Button
            onClick={() => {
              handleScanner();
            }}
            variant="contained"
            fullWidth
          >
            Scanner
          </Button>
        </div>
        <div className="main-button">
          <Button
            className="main-button"
            onClick={() => {
              handleGenerator();
            }}
            variant="contained"
            fullWidth
          >
            Generator
          </Button>
        </div>
      </div>
    </>
  );
}
