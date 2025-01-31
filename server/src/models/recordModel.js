import mongoose from 'mongoose';

const recordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  timeIn: {
    type: Date,
    default: null,
  },
  timeOut: {
    type: Date,
    default: null,
  },
  duration: {
    type: Number,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: 'Duration cannot be negative.',
    },
  },
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
