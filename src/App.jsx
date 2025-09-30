import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import AddBook from "./Pages/AddBook";
import VerifyOtp from "./Pages/VerifyLoginOtp";
import Requests from "./Pages/Requests";

import BookListPage from "./Pages/BookListPage";



function App() {
  const token = localStorage.getItem("token");
   console.log(token)
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyotp" element={<VerifyOtp />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />

      <Route path="/book-list-page" element={token ? <BookListPage /> : <Navigate to="/" />} />
      <Route path="/add-book" element={token ? <AddBook /> : <Navigate to="/" />} />
      <Route path="/requests" element={token ? <Requests /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
