import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },

    companyDescription: {
      type: String,
      default: "",
    },
    companyWebsite: {
      type: String,

      default:"",

    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    activeJobs: [
      {
        jobId: {
          type: Schema.Types.ObjectId,
          ref: "JobPosting",
        },
        jobTitle: {
          type: String,
          required: true,
        },
        jobDescription: {
          type: String,
          required: true,
        },
        freelancerId: {
          type: Schema.Types.ObjectId,
          ref: "Freelancer",
        },
        status: {
          type: String,
          enum: ["ongoing", "completed", "cancelled"],
          default: "ongoing",
        },
        startDate: {
          type: Date,
          default: Date.now,
        },
        endDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
