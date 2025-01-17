// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export enum UserRole {
  Admin = 'admin',
  Coordinator = 'coordinator',
  NotVerified = 'notVerified',
}

interface IUser extends Document {
  email: string;
  password?: string; // <-- Made optional
  role: UserRole;
  name: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // You can add 'required: false' if you prefer
  name: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
