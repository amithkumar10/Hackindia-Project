import mongoose,{Schema} from "mongoose";


const freelancerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    required: true,
  },
  projectsWorkedOn: {
    type: [
      {
        projectName: { type: String, required: true },
        projectLink: { type: String, required: true },
        description: { type: String, required: true },
        timeline: { type: String, required: true },
        clientName: { type: String, required: true },
      },
    ],
    default: [],
  },
  ratings: {
    type: [
      {
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        review: { type: String, default: "" },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Freelancer = mongoose.model("Freelancer", freelancerSchema);



