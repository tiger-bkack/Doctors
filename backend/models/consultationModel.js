import mongoose from "mongoose";

const consultationSchema = mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointment",
    required: true,
  },
  docId: { type: mongoose.Schema.ObjectId, ref: "doctor", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  consultDay: { type: Date, required: true },
  consultTime: { type: Date },
  isCompleted: { type: Boolean, default: false },
  notes: { type: String, required: false },
});

const consultationModel =
  mongoose.models.consultation ||
  mongoose.model("consultation", consultationSchema);

export default consultationModel;
