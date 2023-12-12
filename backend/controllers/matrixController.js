import asyncHandler from 'express-async-handler';
import Matrix from '../models/matrixModel.js';

// @desc    Create a new matrix
// route    POST /api/matrix
// @access  Private && Admin
const createMatrix = asyncHandler(async (req, res) => {
  const { name, ownerId } = req.body;
  const categories = req.body.categories || [];

  const matrixExists = await Matrix.findOne({ name, ownerId });

  if (matrixExists) {
    res.status(400);
    throw new Error('Matrix already exists');
  }

  const matrix = await Matrix.create({
    name,
    categories,
    ownerId,
  });

  if (matrix) {
    res.status(201).json({
      _id: matrix._id,
      name: matrix.name,
      categories: matrix.categories,
      ownerId: matrix.ownerId,
    });
  } else {
    res.status(400);
    throw new Error('Invalid matrix data');
  }
});

// @desc    Get matrices
// route    GET /api/matrix
// @access  Private
const getMatrices = asyncHandler(async (req, res) => {
  const matrices = await Matrix.find(req.query);

  if (matrices) {
    res.status(200).json(matrices);
  } else {
    res.status(400);
    throw new Error('No matrices');
  }
});

// @desc    Update matrix
// route    PUT /api/matrix/:id
// @access  Private && Admin
const updateMatrix = asyncHandler(async (req, res) => {
  const matrix = await Matrix.findById(req.params.id);

  if (matrix) {
    for (let key in req.body) {
      matrix[key] = req.body[key]; // || matrix[key];
    }

    const updatedMatrix = await matrix.save();

    res.status(201).json({
      _id: updatedMatrix._id,
      name: updatedMatrix.name,
      categories: updatedMatrix.categories,
      ownerId: updatedMatrix.ownerId,
    });
  } else {
    res.status(404);
    throw new Error('Matrix not found');
  }
});

// @desc    Get matrix by id
// route    GET /api/matrix/:id
// @access  Private
const getMatrix = asyncHandler(async (req, res) => {
  const matrix = await Matrix.findById(req.params.id);

  if (matrix) {
    res.status(200).json(matrix);
  } else {
    res.status(400);
    throw new Error('Matrix not found');
  }
});

export { createMatrix, getMatrices, updateMatrix, getMatrix };
