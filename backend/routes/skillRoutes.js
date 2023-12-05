import express from 'express';
const router = express.Router();
import {
  createSkill,
  getSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { protect, validateRole } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, validateRole, createSkill)
  .get(protect, getSkills);

router
  .route('/:id')
  .put(protect, validateRole, updateSkill)
  .get(protect, getSkill)
  .delete(protect, validateRole, deleteSkill);

export default router;
