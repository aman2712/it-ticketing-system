import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";

import Navbar from "./components/Navbar";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ClientDashboard from "./screens/ClientDashboard";
import NewTicket from "./screens/NewTicket";
import AdminDashboard from "./screens/AdminDashboard";

import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-yellow-400 hidden"></div>
      <div className="bg-green-400 hidden"></div>
      <Routes>
        <Route path="/ticket/new" element={<NewTicket />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
