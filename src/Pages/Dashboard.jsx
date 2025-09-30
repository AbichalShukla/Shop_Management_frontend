import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import API from "../api/Api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.get("/books/mine");
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);
  
  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((b) => b._id !== bookId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Books
          </h1>
          <p className="text-gray-600 text-lg">Your personal library collection</p>
        </div>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">No Books Yet</h2>
              <p className="text-gray-500">Add some books to see them here and start building your collection!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDeleteBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}