import mongoose from 'mongoose';
import { skillSchema } from './skillModel.js';

const levelSchema = mongoose.Schema({
  beginner: [String],
  advanced: [String],
  proficient: [String],
  expert: [String],
});

const matrixSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    levels: levelSchema,
  },
  {
    timestamps: true,
  }
);

const Matrix = mongoose.model('Matrix', matrixSchema);

export default Matrix;
