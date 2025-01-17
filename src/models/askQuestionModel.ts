// /models/askQuestionModel.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAskQuestion extends Document {
  name?: string;
  email?: string;
  question: string;
  createdAt: Date;
}

const AskQuestionSchema: Schema<IAskQuestion> = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  question: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AskQuestion: Model<IAskQuestion> =
  mongoose.models.AskQuestion || mongoose.model<IAskQuestion>('AskQuestion', AskQuestionSchema);

export default AskQuestion;
