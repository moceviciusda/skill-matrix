import express from 'express';
const router = express.Router();
import { protect, validateRole } from '../middleware/authMiddleware.js';
import {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAssignments,
  updateAssignment,
} from '../controllers/assignmentController.js';

router
  .route('/')
  .post(protect, validateRole, createAssignment)
  .get(protect, getAssignments);

router
  .route('/:id')
  .get(protect, getAssignment)
  .put(protect, updateAssignment)
  .delete(protect, validateRole, deleteAssignment);

export default router;
