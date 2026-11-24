import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const slotSchema = new mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null },
    startTime: { type: String, required: true }, // e.g. "09:00"
    endTime: { type: String, required: true },   // e.g. "09:45"
    room: { type: String, default: '' },
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    slots: [slotSchema],
  },
  { timestamps: true }
);

timetableSchema.plugin(tenantPlugin);
timetableSchema.index({ schoolId: 1, classId: 1, sectionId: 1, dayOfWeek: 1 }, { unique: true });

export const Timetable = mongoose.model('Timetable', timetableSchema);
