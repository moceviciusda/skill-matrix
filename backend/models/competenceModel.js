import mongoose from 'mongoose';
import { skillSchema } from './skillModel.js';

const levelSchema = mongoose.Schema({
  title: String,
  skillIds: [String],
});

const competenceSchema = mongoose.Schema(
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
    levels: {
      type: [levelSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Competence = mongoose.model('Competence', competenceSchema);

export default Competence;
