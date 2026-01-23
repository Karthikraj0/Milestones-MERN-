const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    progress: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "APPROVED", "REJECTED"],
      default: "DRAFT"
    },
    adminComment: { type: String, default: "" },
    assignedTo: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdByRole: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Milestone", milestoneSchema);
