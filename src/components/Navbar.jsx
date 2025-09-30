import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-2xl tracking-wide">BookSwap</h1>
      <div className="flex items-center gap-6">
        <Link
          className="hover:text-blue-200 transition-colors duration-200 font-medium cursor-pointer"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="hover:text-blue-200 transition-colors duration-200 font-medium cursor-pointer"
          to="/add-book"
        >
          Add Book
        </Link>
        <Link
          className="hover:text-blue-200 transition-colors duration-200 font-medium cursor-pointer"
          to="/book-list-page"
        >
          Book List
        </Link>
        <Link
          className="hover:text-blue-200 transition-colors duration-200 font-medium cursor-pointer"
          to="/requests"
        >
          Show Request
        </Link>
        <button
          onClick={logout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}