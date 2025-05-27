import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref:"Project",
      required:true
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    status: {
      type: String,
      default: "pending",
      // Todo: it have the enum value
    },
    attachments:
      {
        type: [{
          url:String,
          mimetype:String,
          size:Number,
        }],
        default:[],
      },
  },
  { timestamps: true },
);

export const Task = mongoose.model("task", taskSchema);
