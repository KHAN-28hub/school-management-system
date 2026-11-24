import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    maxStudents: { type: Number, required: true, min: 1, default: 500 },
    maxFaculty: { type: Number, required: true, min: 1, default: 50 },
    storageLimitMb: { type: Number, default: 5120, min: 100 },
    featureFlags: { type: [String], default: ['intelligence', 'pdf_reports', 'cron_alerts'] },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
