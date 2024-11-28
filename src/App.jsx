import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ViewReports from "./Pages/ViewReports";
import ViewCase from "./Pages/ViewCase";
import Maps from "./Pages/Maps";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reports" element={<ViewReports />} />
          <Route path="/case/:id" element={<ViewCase />} />
          <Route path="/map" element={<Maps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
