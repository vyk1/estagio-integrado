const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
     company: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     id_activities: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Activity'
     }],
     id_student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     id_advisor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     id_supervisor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },

},
     {
          timestamps: true
     }
);

module.exports = mongoose.model('Internship', InternshipSchema);