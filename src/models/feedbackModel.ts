// /models/feedbackModel.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFeedback extends Document {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  gender: string;
  referral: string[];
  programAttended: string[];
  satisfaction: string;
  favoriteAspect: string[];
  spiritualEnrichment: string;
  futureEvents: string;
  volunteer: string;
  programSuggestions: string[];
  additionalComments?: string;
  createdAt: Date;
}

const FeedbackSchema: Schema<IFeedback> = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  ageGroup: { type: String, required: true },
  gender: { type: String, required: true },
  referral: [{ type: String, required: true }],
  programAttended: [{ type: String, required: true }],
  satisfaction: { type: String, required: true },
  favoriteAspect: [{ type: String, required: true }],
  spiritualEnrichment: { type: String, required: true },
  futureEvents: { type: String, required: true },
  volunteer: { type: String, required: true },
  programSuggestions: [{ type: String, required: true }],
  additionalComments: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
