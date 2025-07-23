import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes/getAllNotes", axiosConfig)
      .then((res) => {
        setNotes(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setNotes([]);
      });
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
        📝 All Notes
      </h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          className="w-full p-3 rounded-xl border border-gray-300 bg-white/80 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length ? (
          filteredNotes.map((note) => (
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

              {/* Last updated time */}
              <div className="text-sm text-gray-500 mt-2">
                🕒 Last updated: {new Date(note.updatedAt).toLocaleString()}
              </div>

              {/* Edit + Delete buttons */}
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
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">No notes found.</p>
        )}
      </div>

      {/* Create new note button */}
      <button
        onClick={() => navigate("/homepage/newnote")}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-indigo-700 transition"
      >
        ➕ Create New Note
      </button>

      {/* Delete confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this note?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `http://localhost:5000/api/notes/${noteToDelete}`,
                      axiosConfig
                    );
                    setNotes(notes.filter((note) => note._id !== noteToDelete));
                  } catch (err) {
                    console.error("Error deleting note:", err);
                  } finally {
                    setShowConfirmModal(false);
                    setNoteToDelete(null);
                  }
                }}
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

export default AllNotes;
