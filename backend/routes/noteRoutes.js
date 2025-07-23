// add routes
const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const authMiddleware = require('../middleware/authMiddleware'); // assumes JWT authentication middleware

// Apply authMiddleware to all note routes
router.use(authMiddleware);

// Create a new note
router.post('/createNote', createNote);

// Get all notes for logged-in user
router.get('/getAllNotes', getAllNotes);

// Get a specific note by ID
router.get('/:id', getNoteById);

// Update a note by ID
router.put('/:id', updateNote);

// Delete a note by ID
router.delete('/:id', deleteNote);

module.exports = router;
