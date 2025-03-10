<<<<<<< HEAD
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
  bidAmount: {
    type: Number,
    default: 0,
  },
  applicationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
=======
import mongoose,{Schema} from "mongoose";

const jobApplicationSchema = new Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"JobPosting"
    },
    freelancerId:{
        type:Schema.Types.ObjectId,
        ref:"Freelancer"
    },
    bidAmount:{
        type:Number,
        default:0
    },
    applicationStatus:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },


})

export const JobApplication = mongoose.model("JobApplication",jobApplicationSchema);    
>>>>>>> 446f43ab5ea471ce083909da5a43681a24ec9bc2
