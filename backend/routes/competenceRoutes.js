import express from 'express'
const router = express.Router()
import {
    createCompetence,
    getCompetence,
    updateCompetence,
    // deleteCompetence
} from '../controllers/competenceController.js'
import { protect, validateRole } from '../middleware/authMiddleware.js'


router.route('/')
    .post(protect, validateRole, createCompetence)
    .get(protect, getCompetence)
    .put(protect, validateRole, updateCompetence)
    // .delete(protect, deleteCompetence)

export default router