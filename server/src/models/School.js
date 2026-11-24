import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    logoUrl: { type: String, default: '' },
    address: { type: String, default: '' },
    contactPerson: { type: String, default: '' },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    status: {
      type: String,
      enum: ['active', 'suspended', 'expired', 'trial'],
      default: 'trial',
      index: true,
    },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', default: null },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'trial', 'grace', 'suspended', 'expired'],
      default: 'trial',
      index: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
    trialEndsAt: { type: Date, default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
    gracePeriodDays: { type: Number, default: 7, min: 0, max: 60 },
    lastPaymentDate: { type: Date, default: null },
    autoSuspend: { type: Boolean, default: true },
    manualSuspension: {
      isSuspended: { type: Boolean, default: false },
      reason: { type: String, default: '' },
      suspendedAt: { type: Date, default: null },
      suspendedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    softDeletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

export const School = mongoose.model('School', schoolSchema);
