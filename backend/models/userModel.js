import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSkillSchema = mongoose.Schema({
  skillId: { type: String, required: true },
  approvedBy: { type: [String], default: [] },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    skills: {
      type: [userSkillSchema],
      default: [],
    },
    assignments: {
      type: [String],
      default: [],
    },
    group: {
      type: String,
      // required: true
    },
    team: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
