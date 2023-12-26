import mongoose from 'mongoose';

const competenceSkillSchema = mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
      default: 1,
    },
    skillId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const competenceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skills: {
      type: [competenceSkillSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Competence = mongoose.model('Competence', competenceSchema);

export default Competence;
