import asyncHandler from 'express-async-handler';
import Competence from '../models/competenceModel.js';

// @desc    Create a new competence
// route    POST /api/competences
// @access  Private && Admin
const createCompetence = asyncHandler(async (req, res) => {
  const { name, skills } = req.body;

  const competence = await Competence.create({
    name,
    skills: skills || [],
  });

  if (competence) {
    res.status(201).json({
      _id: competence._id,
      name: competence.name,
      skills: competence.skills,
    });
  } else {
    res.status(400);
    throw new Error('Invalid competence data');
  }
});

// @desc    Get competences
// route    GET /api/competences
// @access  Private
const getCompetences = asyncHandler(async (req, res) => {
  const competence = await Competence.find(req.query);

  if (competence) {
    res.status(201).json(competence);
  } else {
    res.status(400);
    throw new Error('No competences found');
  }
});

// @desc    Get competence by id
// route    GET /api/competences/:id
// @access  Private
const getCompetence = asyncHandler(async (req, res) => {
  const competence = await Competence.findById(req.params.id);

  if (competence) {
    res.status(201).json(competence);
  } else {
    res.status(400);
    throw new Error('No competences found');
  }
});

// @desc    Update competence
// route    PUT /api/competences/:id
// @access  Private && Admin
const updateCompetence = asyncHandler(async (req, res) => {
  const competence = await Competence.findById(req.params.id);

  if (competence) {
    for (let key in req.body) {
      competence[key] = req.body[key] || competence[key];
    }

    const updatedCompetence = await competence.save();

    res.status(200).json({
      _id: updatedCompetence._id,
      name: updatedCompetence.name,
      skills: updatedCompetence.skills,
    });
  } else {
    res.status(404);
    throw new Error('Competence not found');
  }
});

// @desc    Delete competence by id
// route    DELETE /api/competences/:id
// @access  Private && Admin
const deleteCompetence = asyncHandler(async (req, res) => {
  const competence = await Competence.findById(req.params.id);

  if (competence) {
    Competence.deleteOne({ _id: competence._id }).then(() => {
      res.status(204).json({ message: 'Competence deleted successfully' });
    });
  } else {
    res.status(404);
    throw new Error('Competence not found');
  }
});

// @desc    Get competence levels
// route    GET /api/competences/:id/levels
// @access  Private
const getCompetenceLevels = asyncHandler(async (req, res) => {
  const competence = await Competence.findById(req.params.id);

  if (competence) {
    res.status(201).json(competence.levels);
  } else {
    res.status(400);
    throw new Error('Competence not found');
  }
});

// @desc    Update competence levels
// route    PUT /api/competences/:id/levels
// @access  Private && Admin
const updateCompetenceLevels = asyncHandler(async (req, res) => {
  const competence = await Competence.findById(req.params.id);

  if (competence) {
    for (let key in req.body) {
      competence.levels[key] = req.body[key];
    }

    const updatedCompetence = await competence.save();

    res.status(200).json({
      _id: updatedCompetence._id,
      name: updatedCompetence.name,
      type: updatedCompetence.type,
      category: updatedCompetence.category,
      levels: updatedCompetence.levels,
    });
  } else {
    res.status(404);
    throw new Error('Competence not found');
  }
});

export {
  createCompetence,
  getCompetences,
  getCompetence,
  updateCompetence,
  getCompetenceLevels,
  updateCompetenceLevels,
  deleteCompetence,
};
