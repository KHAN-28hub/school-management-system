import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['attendance', 'result', 'fee', 'risk', 'general'], default: 'general' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String, default: '' },
    readAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

notificationSchema.plugin(tenantPlugin);

export const Notification = mongoose.model('Notification', notificationSchema);
