// addd starred amd get starrednotes 
const Note = require('../models/Notes');
const logger = require('../utils/logger');

// In routes/noteRoutes.js or your note controller
const starred = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    note.starred = !note.starred;
    await note.save();

    res.json({ success: true, starred: note.starred });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Get only starred notes for the authenticated user
const getStarredNotes = async (req, res) => {
  try {
     console.log("User ID from token:", req.user); // 👈 Check this
    const notes = await Note.find({ user: req.user.id, starred: true }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Error getting starred notes", err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE a new note
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const userId = req.user.id;

    const newNote = new Note({ title, content, user: userId });
    const savedNote = await newNote.save();

    logger.info(`Note created for user ${userId}: ${savedNote._id}`);
    res.status(201).json(savedNote);
  } catch (err) {
    logger.error(`Error creating note for user ${req.user.id}: ${err.message}`);
    next(err);
  }
};

// GET all notes for the logged-in user
const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ user: userId }).sort({ updatedAt: -1 });

    logger.info(`Fetched ${notes.length} notes for user ${userId}`);
    res.status(200).json(notes);
  } catch (err) {
    logger.error(`Error fetching notes for user ${req.user.id}: ${err.message}`);
    next(err);
  }
};

// GET a single note by ID
const getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      logger.warn(`Note not found: ${noteId} by user ${userId}`);
      return res.status(404).json({ message: 'Note not found' });
    }

    logger.info(`Fetched note ${noteId} for user ${userId}`);
    res.status(200).json(note);
  } catch (err) {
    logger.error(`Error getting note ${req.params.id}: ${err.message}`);
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

    if (!note) {
      logger.warn(`Update failed. Note not found: ${noteId} by user ${userId}`);
      return res.status(404).json({ message: 'Note not found' });
    }

    logger.info(`Updated note ${noteId} for user ${userId}`);
    res.status(200).json(note);
  } catch (err) {
    logger.error(`Error updating note ${req.params.id}: ${err.message}`);
    next(err);
  }
};

// DELETE a note
const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });


    if (!note) {
      logger.warn(`Delete failed. Note not found: ${noteId} by user ${userId}`);
      return res.status(404).json({ message: 'Note not found' });
    }

    logger.info(`Deleted note ${noteId} for user ${userId}`);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting note ${req.params.id}: ${err.message}`);
    next(err);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  starred,
  getStarredNotes
};
