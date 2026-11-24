import mongoose from 'mongoose';

const platformAuditLogSchema = new mongoose.Schema(
  {
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true, index: true },
    targetSchoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null, index: true },
    reason: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: null },
    ip: { type: String, default: '' },
  },
  { timestamps: true }
);

platformAuditLogSchema.index({ createdAt: -1 });

export const PlatformAuditLog = mongoose.model('PlatformAuditLog', platformAuditLogSchema);
