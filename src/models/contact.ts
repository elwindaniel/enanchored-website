import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: String,
    place: String,
    message: String,
    phoneNumber: String,
    email: String,
});

export default mongoose.models.Contact ||
    mongoose.model("contact", ContactSchema);
