import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      status: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

const Case = mongoose.model('Case', caseSchema);
export default Case;
