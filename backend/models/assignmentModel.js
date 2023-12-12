import mongoose from 'mongoose';

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
    skillsEarned: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
