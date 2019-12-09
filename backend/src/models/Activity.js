const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
     date: {
          type: Date,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     inputTime: {
          type: String,
          required: true
     },
     outputTime: {
          type: String,
          required: true
     },
     image: String,
     id_internship: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Internship'
     },
},
     {
          timestamps: true
     }
);

module.exports = mongoose.model('Activity', ActivitySchema);