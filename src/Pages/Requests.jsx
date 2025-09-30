import { useEffect, useState } from "react";
import API from "../api/Api";

export default function Requests() {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    API.get("/requests/sent").then((res) => setSent(res.data));
    API.get("/requests/received").then((res) => setReceived(res.data));
  }, []);



  const handleStatus = async (id, status) => {
    try {
    await API.patch(`/requests/${id}/status`, { status });
      setReceived((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Book Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Sent Requests */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📤 Sent Requests
          </h2>
          {sent.length === 0 ? (
            <p className="text-gray-500">No requests sent.</p>
          ) : (
            <div className="space-y-4">
              {sent.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <p className="font-medium text-gray-800">
                    Book: {r.book?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Owner: {r.book?.owner?.name}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                      r.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : r.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Received Requests */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📥 Received Requests
          </h2>
          {received.length === 0 ? (
            <p className="text-gray-500">No requests received.</p>
          ) : (
            <div className="space-y-4">
              {received.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <p className="font-medium text-gray-800">
                    Book: {r.book?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    From: {r.requester?.name} ({r.requester?.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span
                      className={`${
                        r.status === "accepted"
                          ? "text-green-600 font-semibold"
                          : r.status === "declined"
                          ? "text-red-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }`}
                    >
                      {r.status}
                    </span>
                  </p>

                  {r.status === "pending" && (
                    <div className="mt-3 flex space-x-3">
                      <button
                        onClick={() => handleStatus(r._id, "accepted")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatus(r._id, "declined")}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
