import asyncHandler from 'express-async-handler';
import Assignment from '../models/assignmentModel.js';

// @desc    Create new assignment
// route    POST /api/assignments
// @access  Private && admin
const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create({
    ...req.body,
    assignedBy: req.user._id,
  });

  if (assignment) {
    res.status(201).json(assignment);
  } else {
    res.status(400);
    throw new Error('Invalid assignment data');
  }
});

// @desc    Get assignment by id
// route    GET /api/assignments/:id
// @access  Private
const getAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (assignment) {
    res.status(201).json(assignment);
  } else {
    res.status(400);
    throw new Error('Assignment not found');
  }
});

// @desc    Get assignments
// route    GET /api/assignments
// @access  Private
const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find(req.query);

  if (assignments) {
    res.status(200).json(assignments);
  } else {
    res.status(400);
    throw new Error('No assignments found');
  }
});

// @desc    Update assignment by id
// route    PUT /api/assignments/:id
// @access  Private
const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (assignment) {
    for (let key in req.body) {
      assignment[key] = req.body[key];
    }

    const updatedAssignment = await assignment.save();

    res.status(201).json(updatedAssignment);
  } else {
    res.status(404);
    throw new Error('Assignmeant not found');
  }
});

// @desc    Delete assignment by id
// route    DELETE /api/assignments/:id
// @access  Private && admin
const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (assignment) {
    Assignment.deleteOne({ _id: assignment._id }).then(() => {
      res.status(204).json({ message: 'Assignment deleted successfully' });
    });
  } else {
    res.status(404);
    throw new Error('Assignment not found');
  }
});

export {
  createAssignment,
  getAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
};
