import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },

    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
