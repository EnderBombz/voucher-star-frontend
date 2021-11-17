import React from "react";
import { Routes, Route } from "react-router-dom";

import Scanner from "../pages/scanner";
import Generator from "../pages/qrcodeGen";
import Main from "../pages/main";

export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/generator" element={<Generator />} />
    </Routes>
  );
}
