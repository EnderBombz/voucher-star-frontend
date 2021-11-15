import React from "react";
//import history from "./../history/history"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Scanner from "../pages/scanner";
import Generator from "../pages/qrcodeGen";

export default function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<h1>Bem vindo</h1>} />
        <Route exact path="/scanner" element={<Scanner />} />
        <Route exact path="/generator" element={<Generator />} />
      </Routes>
    </BrowserRouter>
  );
}
