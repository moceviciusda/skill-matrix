import mongoose from 'mongoose';
const competenceListSchema = mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
      default: 1,
    },
    competenceId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      default: 1,
    },
    competences: {
      type: [competenceListSchema],
      default: [],
    },
  },
  { _id: false }
);

const matrixSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categories: {
      type: [categorySchema],
      default: [],
    },
    ownerId: String,
  },
  {
    collection: 'matrices',
    timestamps: true,
  }
);

const Matrix = mongoose.model('Matrix', matrixSchema);

export default Matrix;
