import mongoose from 'mongoose';

const competenceSkillSchema = mongoose.Schema({
  weight: {
    type: Number,
    required: true,
    default: 1,
  },
  skillId: {
    type: String,
    required: true,
  },
});

const competenceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      beginner: [competenceSkillSchema],
      advanced: [competenceSkillSchema],
      proficient: [competenceSkillSchema],
      expert: [competenceSkillSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Competence = mongoose.model('Competence', competenceSchema);

export default Competence;
