// add routes for starred
const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  starred,
  getStarredNotes,
} = require('../controllers/noteController');

const authMiddleware = require('../middleware/authMiddleware');

// Apply to all routes
router.use(authMiddleware);

router.post('/createNote', createNote);
router.get('/getAllNotes', getAllNotes);
router.get('/starred', getStarredNotes);
router.patch('/star/:id', starred); 
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


module.exports = router;
