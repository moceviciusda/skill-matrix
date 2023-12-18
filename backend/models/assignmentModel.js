import mongoose from 'mongoose';

const assignmentSkillSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    comments: { type: [String], default: [] },
    assigneeChecked: { type: Boolean, default: false },
    assignerChecked: { type: Boolean, default: false },
  },
  { _id: false }
);

const assignmentSchema = mongoose.Schema(
  {
    matrixId: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: String,
      required: true,
    },
    committed: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [assignmentSkillSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
