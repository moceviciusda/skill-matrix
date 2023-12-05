import asyncHandler from 'express-async-handler';
import { Skill } from '../models/skillModel.js';

// @desc    Create new skill
// route    POST /api/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
  const { summary, description } = req.body;

  const skillExists = await Skill.findOne({ summary });

  if (skillExists) {
    res.status(400);
    throw new Error('Skill already exists');
  }

  const skill = await Skill.create({
    summary,
    description,
  });

  if (skill) {
    res.status(201).json({
      _id: skill._id,
      summary: skill.summary,
      description: skill.description,
    });
  } else {
    res.status(400);
    throw new Error('Invalid skill data');
  }
});

// @desc    Get skill by id
// route    GET /api/skills/:id
// @access  Private
const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    res.status(201).json(skill);
  } else {
    res.status(400);
    throw new Error('Skill not found');
  }
});

// @desc    Get skills
// route    GET /api/skills
// @access  Private
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find(req.query);

  if (skills) {
    res.status(201).json(skills);
  } else {
    res.status(400);
    throw new Error('No skills found');
  }
});

// @desc    Update skill
// route    PUT /api/skills
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    skill.summary = req.body.summary || skill.summary;
    skill.description = req.body.description || skill.description;

    const updatedSkill = await skill.save();

    res.status(200).json({
      _id: updatedSkill._id,
      name: updatedSkill.summary,
      email: updatedSkill.description,
    });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Delete skill
// route    DELETE /api/skills
// @access  Private
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    Skill.deleteOne({ _id: skill._id }).then(() => {
      res.status(204).json({ message: 'Skill deleted successfully' });
    });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

export { createSkill, getSkill, getSkills, updateSkill, deleteSkill };
