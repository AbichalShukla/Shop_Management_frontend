import { useEffect, useState } from "react";
import API from "../api/Api";

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [excludeMine, setExcludeMine] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/books?excludeMine=${excludeMine}`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (bookId) => {
    try {
      await API.post(`/request`, { bookId });
      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [excludeMine]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Available Books
          </h1>
          <label className="flex items-center space-x-3 bg-white px-5 py-3 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200">
            <input
              type="checkbox"
              checked={excludeMine}
              onChange={() => setExcludeMine(!excludeMine)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-700 font-medium">Exclude My Books</span>
          </label>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="mt-4 text-gray-600 text-lg font-medium">No books found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {book.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-56 object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-blue-600">{book.condition}</span>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Condition:</span> {book.condition}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Owner</p>
                    <p className="text-sm text-gray-700 font-medium">{book.owner?.name}</p>
                    <p className="text-xs text-gray-500">{book.owner?.email}</p>
                  </div>

                  <button
                    onClick={() => handleRequest(book._id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Request Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}