import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarredNotes = () => {
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchStarredNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/starred", axiosConfig);
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching starred notes:", err);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchStarredNotes();
  }, []);

  const toggleStar = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notes/star/${id}`, null, axiosConfig);
      fetchStarredNotes(); // refresh after toggle
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteToDelete}`, axiosConfig);
      setNotes(notes.filter((note) => note._id !== noteToDelete));
    } catch (err) {
      console.error("Error deleting note:", err);
    } finally {
      setShowConfirmModal(false);
      setNoteToDelete(null);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center text-yellow-600 drop-shadow-lg">
        ⭐ Starred Notes
      </h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-400">No starred notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-2xl shadow-lg relative hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-xl font-semibold text-purple-700">
                {note.title}
              </h2>

              <div
                className="text-gray-800 mt-2 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              <div className="text-sm text-gray-500 mt-2">
                🕒 Last updated: {new Date(note.updatedAt).toLocaleString()}
              </div>

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() =>
                    navigate(`/homepage/editnote/${note._id}`, {
                      state: { title: note.title, content: note.content },
                    })
                  }
                  className="text-blue-600 hover:text-blue-800 text-lg"
                  title="Edit"
                >
                  ✎
                </button>

                <button
                  onClick={() => {
                    setNoteToDelete(note._id);
                    setShowConfirmModal(true);
                  }}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Delete"
                >
                  ✖
                </button>

                <button
                  onClick={() => toggleStar(note._id)}
                  className="text-yellow-500"
                  title="Unstar"
                >
                  {note.starred ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this note?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setNoteToDelete(null);
                }}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarredNotes;
