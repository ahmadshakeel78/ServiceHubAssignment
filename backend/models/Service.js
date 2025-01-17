const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    required_fields: [
      {
        label: {
          en: { type: String, required: true },
          ar: { type: String, required: true },
        },
        name: { type: String, required: true },
        type: { type: String, required: true },
        validation: { type: String },
        max_length: { type: Number },
        default_value: { type: String, default: "" },
        validation_error_message: {
          en: { type: String },
          ar: { type: String },
        },
        placeholder: {
          en: { type: String },
          ar: { type: String },
        },
        options: [
          {
            label: { type: String },
            name: { type: String },
          },
        ],
      },
    ],
  });
  

module.exports = mongoose.model('Service', ServiceSchema);
