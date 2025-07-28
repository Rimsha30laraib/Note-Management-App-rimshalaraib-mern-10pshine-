import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../components/TipTapEditor/TipTapEditor.jsx";
import { toast } from "react-toastify";

const CreateNote = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleCreateOrUpdate = async () => {
    if (!newNote.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!newNote.content.trim()) {
      setError("Content is required.");
      return;
    }

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5000/api/notes/${editId}`,
          newNote,
          axiosConfig
        );
        setNotes(notes.map((note) => (note._id === editId ? res.data : note)));
        toast.success("Note updated successfully!");
        setEditId(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/notes/createNote",
          newNote,
          axiosConfig
        );
        setNotes([res.data, ...notes]);
        toast.success(" Note created successfully!");
        navigate("/homepage");
      }

      setNewNote({ title: "", content: "" });
      setError("");
    } catch (err) {
      console.error("Error creating/updating note:", err);
      toast.error(" Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
          📝 My Notes
        </h1>

        <div className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-xl mb-8">
          {error && (
            <div className="mb-4 text-red-600 font-medium">{error}</div>
          )}

          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-3 rounded w-full mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({ ...newNote, title: e.target.value })
            }
          />

          <TiptapEditor
            value={newNote.content}
            onChange={(htmlContent) =>
              setNewNote({ ...newNote, content: htmlContent })
            }
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCreateOrUpdate}
              className="bg-indigo-600 text-black px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {editId ? "Update Note" : "Create Note"}
            </button>
            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setNewNote({ title: "", content: "" });
                  setError("");
                }}
                className="bg-gray-400 text-black px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
