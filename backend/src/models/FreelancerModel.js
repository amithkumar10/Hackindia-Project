<<<<<<< HEAD
import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
=======
import mongoose,{Schema} from "mongoose";


const freelancerSchema = new Schema({
>>>>>>> 446f43ab5ea471ce083909da5a43681a24ec9bc2
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
<<<<<<< HEAD
        companyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
          required: true,
        },
=======
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
>>>>>>> 446f43ab5ea471ce083909da5a43681a24ec9bc2
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

<<<<<<< HEAD
const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;
=======

export const Freelancer = mongoose.model("Freelancer", freelancerSchema);



>>>>>>> 446f43ab5ea471ce083909da5a43681a24ec9bc2
