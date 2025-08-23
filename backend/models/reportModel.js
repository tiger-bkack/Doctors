import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  appointmentId: { type: String, required: true },
  userData: { type: Object, required: true },
  appointmentData: { type: Object, required: true },

  docData: { type: Object, required: true },
  //visiDate :{type : Date , default : Date.now}
  complaint: { type: String, required: true },
  examination: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  notes: { type: String },
  nextVisit: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const reportModel =
  mongoose.models.report || mongoose.model("report", reportSchema);

export default reportModel;
