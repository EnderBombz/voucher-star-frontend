import React from "react";
//import history from "./../history/history"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import history from "./../history/history";

import Scanner from "../pages/scanner";
import Generator from "../pages/qrcodeGen";
import Main from "../pages/main";

export default function RoutesList() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/scanner" element={<Scanner />} />
        <Route exact path="/generator" element={<Generator />} />
      </Routes>
    </BrowserRouter>
  );
}
