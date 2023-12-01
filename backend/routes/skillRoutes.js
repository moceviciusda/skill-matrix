import express from 'express'
const router = express.Router()
import {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
} from '../controllers/skillController.js'
import { protect, validateRole } from '../middleware/authMiddleware.js'


router.route('/')
    .post(protect, validateRole, createSkill)
    .get(protect, getSkills)
    .put(protect, validateRole, updateSkill)
    .delete(protect, validateRole, deleteSkill)

export default router