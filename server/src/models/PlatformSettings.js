import mongoose from 'mongoose';

const platformSettingsSchema = new mongoose.Schema(
  {
    platformName: { type: String, default: 'Greenfield SaaS Cloud' },
    defaultTrialDays: { type: Number, default: 14, min: 1, max: 90 },
    gracePeriodDays: { type: Number, default: 7, min: 0, max: 60 },
    reminderDays: { type: [Number], default: [14, 7, 3, 1, 0] },
    supportEmail: { type: String, default: 'billing@schoolcloud.io' },
    supportPhone: { type: String, default: '+1-800-555-0199' },
    supportMessage: {
      type: String,
      default: 'Your school subscription is currently inactive. Please contact platform billing to restore immediate access.',
    },
    paymentInstructions: {
      type: String,
      default: 'Wire transfer to SchoolCloud Inc. (Ref: your School Code) or contact billing@schoolcloud.io.',
    },
  },
  { timestamps: true }
);

export const PlatformSettings = mongoose.model('PlatformSettings', platformSettingsSchema);
