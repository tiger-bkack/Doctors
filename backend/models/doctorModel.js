import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, default: "00000000000" },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experince: { type: String, required: true },
    about: { type: String, required: true },
    avalibale: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    start_booked: {
      from: { type: Number, required: true, default: 9 },
      to: { type: Number, required: true, default: 16 },
      booking_period: { type: Number, required: true, default: 15 },
    },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
