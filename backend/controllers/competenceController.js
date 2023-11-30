import asyncHandler from 'express-async-handler'
import Competence from '../models/competenceModel.js'


// @desc    Create a new competence
// route    POST /api/competences
// @access  Private
const createCompetence = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, type, category } = req.body
    const levels = req.body.levels || []

    const competenceExists = await Competence.findOne({ name })

    if (competenceExists) {
        res.status(400)
        throw new Error('Competence already exists')
    }

    const competence = await Competence.create({
        name,
        type,
        category,
        levels
    })

    if (competence) {
        res.status(201).json({
            _id: competence._id,
            name: competence.name,
            type: competence.type,
            category: competence.category,
            levels: competence.levels
        })
    } else {
        res.status(400)
        throw new Error('Invalid competence data')
    }

})

// @desc    Get competence
// route    GET /api/competences
// @access  Private
const getCompetence = asyncHandler(async (req, res) => {
    const competence = await Competence.findOne(req.body)

    res.status(200).json(competence)
})

// @desc    Update competence
// route    PUT /api/competences
// @access  Private
const updateCompetence = asyncHandler(async (req, res) => {
    const competence = await Competence.findById(req.body._id).select('-_id')

    if (competence) {
        for (let key in req.body) {
            competence[key] = req.body[key] || competence[key]
        }

        const updatedCompetence = await competence.save()

        res.status(200).json({
            _id: updatedCompetence._id,
            name: updatedCompetence.name,
            type: updatedCompetence.type,
            category: updatedCompetence.category,
            levels: updatedCompetence.levels
        })
    } else {
        res.status(404)
        throw new Error('Competence not found')
    }
})

export {
    createCompetence,
    getCompetence,
    updateCompetence
}