import express from 'express';
const router = express.Router();
import {
  createCompetence,
  getCompetence,
  getCompetenceLevels,
  updateCompetence,
  updateCompetenceLevels,
  // deleteCompetence
} from '../controllers/competenceController.js';
import { protect, validateRole } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, validateRole, createCompetence)
  .get(protect, getCompetence)
  .put(protect, validateRole, updateCompetence);

router
  .route('/:id/levels')
  .get(protect, getCompetenceLevels)
  .put(protect, validateRole, updateCompetenceLevels);
// .delete(protect, deleteCompetence)

export default router;
