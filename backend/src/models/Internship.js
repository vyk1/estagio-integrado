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
          ref: 'User'
     },
     id_advisor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
     },
     id_supervisor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
     },

     // groupby and count
     // passa id da internship
     // e faz os role com populate e/ou
     // aggregate
     // https://stackoverflow.com/questions/41791015/mongoose-group-and-count
},
     {
          timestamps: true
     }
);

module.exports = mongoose.model('Internship', InternshipSchema);