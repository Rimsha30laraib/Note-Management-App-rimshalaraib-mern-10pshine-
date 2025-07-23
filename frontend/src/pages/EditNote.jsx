import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../components/TipTapEditor/TipTapEditor.jsx";

const EditNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // Get note ID from URL
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch existing note on load
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          axiosConfig
        );
        setNote(res.data);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Failed to load note.");
      }
    };

    fetchNote();
  }, [id]);

  // Handle save
  const handleSave = async () => {
    if (!note.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!note.content.trim()) {
      setError("Content is required.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        note,
        axiosConfig
      );
      alert("✅ Note updated successfully!");
      navigate("/homepage");
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Something went wrong while saving.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    navigate("/homepage");
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-white drop-shadow-lg">
          ✏️ Edit Note
        </h1>

        <div className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-xl mb-8">
          {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-3 rounded w-full mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={note.title}
            onChange={(e) =>
              setNote({ ...note, title: e.target.value })
            }
          />

          <TiptapEditor
            value={note.content}
            onChange={(htmlContent) =>
              setNote({ ...note, content: htmlContent })
            }
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-black px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-black px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
