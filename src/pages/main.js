import React from "react";
import voucherLogo from "./../images/VOUCHER_STAR_LOGO.png";
import { Button } from "@mui/material";
import history from "./../history/history";
import { Link } from "react-router-dom";

export default function Main() {
  const handleScanner = () => {
    history.push("/scanner");
  };
  const handleGenerator = () => {
    history.push("/generator");
  };

  return (
    <>
      <div className="main-logo">
        <img src={voucherLogo} />
      </div>
      <div>
        <div className="main-button">
          <Link to="/scanner">
            <Button
              onClick={() => {
                handleScanner();
              }}
              variant="contained"
              fullWidth
            >
              Scanner
            </Button>
          </Link>
        </div>
        <div className="main-button">
          <Link to="/generator" className="main-button">
            <Button
              className="main-button"
              onClick={() => {
                return;
              }}
              variant="contained"
              fullWidth
            >
              Generator
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
