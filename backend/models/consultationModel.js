import mongoose from "mongoose";

const consultationSchema = mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointment",
    required: true,
  },
  appointmentData: { type: Object, required: true },
  docId: { type: mongoose.Schema.ObjectId, ref: "doctor", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  consultDay: { type: Date, required: true },
  consultTime: { type: String },
  isCompleted: { type: Boolean, default: false },
  cancelled: { type: Boolean, required: false },
  notes: { type: String, required: false },
});

const consultationModel =
  mongoose.models.consultation ||
  mongoose.model("consultation", consultationSchema);

export default consultationModel;
