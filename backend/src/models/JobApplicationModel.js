import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "JobPosting",
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: "Freelancer",
  },
  proposal: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    default: 0,
  },
  applicationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "shortlisted"], //added shortlisted
    default: "pending",
  },
});

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
