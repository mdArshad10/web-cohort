import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    project: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
    assignedBy: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      // Todo: it have the enum value
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export const Task = mongoose.model("task", taskSchema);
