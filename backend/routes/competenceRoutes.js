import express from 'express';
const router = express.Router();
import {
  createCompetence,
  getCompetences,
  getCompetence,
  getCompetenceLevels,
  updateCompetence,
  updateCompetenceLevels,
  deleteCompetence,
} from '../controllers/competenceController.js';
import { protect, validateRole } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, validateRole, createCompetence)
  .get(protect, getCompetences);

router
  .route('/:id')
  .get(protect, getCompetence)
  .put(protect, validateRole, updateCompetence)
  .delete(protect, validateRole, deleteCompetence);

router
  .route('/:id/levels')
  .get(protect, getCompetenceLevels)
  .put(protect, validateRole, updateCompetenceLevels);

export default router;
