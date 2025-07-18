const Note = require('../models/Notes');

// CREATE a new note
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // from auth middleware

    const newNote = new Note({
      title,
      content,
      user: userId
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
};

// GET all notes for the logged-in user
const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ user: userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

// GET a single note by ID
const getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

// UPDATE a note
const updateNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

// DELETE a note
const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
};
