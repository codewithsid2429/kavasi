import mongoose, { Schema, model, models } from 'mongoose';

const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);

export default TeamMember;
