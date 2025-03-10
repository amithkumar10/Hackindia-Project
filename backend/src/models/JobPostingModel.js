import mongoose,{ Schema } from "mongoose";

const jobPostingSchema = new Schema({

    companyId:{
        type:Schema.Types.ObjectId,
        ref:"Company"
    },
    title:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    skills:[{
        type:String,
        required:true
    }],
    budget:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["open","closed"],
        default:"open"
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: "JobApplication"
    }],
    
 
  
},{ timestamps: true });

export const JobPosting = mongoose.model("JobPosting", jobPostingSchema);
