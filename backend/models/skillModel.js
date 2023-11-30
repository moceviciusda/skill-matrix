import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    summary: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
})


const Skill = mongoose.model('Skill', skillSchema)

export { Skill, skillSchema }