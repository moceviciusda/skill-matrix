import express from 'express';
const router = express.Router();
import {
  createMatrix,
  getMatrix,
  updateMatrix,
  getMatrices,
} from '../controllers/matrixController.js';
import { protect, validateRole } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, validateRole, createMatrix)
  .get(protect, getMatrices);

router
  .route('/:id')
  .get(protect, getMatrix)
  .put(protect, validateRole, updateMatrix);

// router
//   .route('/:id/levels')
//   .get(protect, getCompetenceLevels)
//   .put(protect, validateRole, updateCompetenceLevels);
// // .delete(protect, deleteCompetence)

export default router;
