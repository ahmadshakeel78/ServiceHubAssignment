const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  data: { type: Object, required: true }, // Store submitted data as an object
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
