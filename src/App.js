import "./styles.css";
//import Routes from "./routes/routes";
import { BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";
import RoutesList from "./routes/routes";

export default function App() {
  return <RoutesList />;
}
