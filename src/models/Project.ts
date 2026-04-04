import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
