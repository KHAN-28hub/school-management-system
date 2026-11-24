import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const parentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    occupation: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

parentSchema.plugin(tenantPlugin);
parentSchema.index({ children: 1 });

export const Parent = mongoose.model('Parent', parentSchema);
