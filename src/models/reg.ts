import mongoose from 'mongoose';

const RegSchema = new mongoose.Schema({
  firstName: String,
  surName: String,
  place: String,
  church: String,
  age: String,
  occupation: String,
  phoneNumber: String,
  email: String,
  hasAllergies: Boolean,
  allergies: String,
});

export default mongoose.models.Reg || mongoose.model('Reg', RegSchema);