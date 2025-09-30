import React from "react";
import API from "../api/Api";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, onDelete }) {
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/book/${book._id}`);
        alert("Book deleted successfully!");
        onDelete(book._id);
      } catch (err) {
        console.error(err);
        alert("Failed to delete book");
      }
    }
  };
  
  const handleBookRequest = async () => {
    navigate(`/allbookdetails/${book._id}`);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={book.image || "https://via.placeholder.com/200x250"}
          alt={book.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-sm font-medium">{book.author}</span>
          </div>
          
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {book.condition}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}