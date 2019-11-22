const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({

     name: {
          type: String,
          require: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true
     },
     password: {
          type: String,
          required: true,
          select: false
     },
     passwordResetToken: {
          type: String,
          select: false
     },
     passwordResetExpires: {
          type: Date,
          select: false
     },
     emailConfirmed: {
          type: Boolean,
          select: false,
          default: false
     },
     verified: {
          type: Boolean,
          select: false,
          default: false
     },
     phone: {
          type: String,
     },
     type: {
          type: Number,
     }

},
     {
          timestamps: true
     }
);

UserSchema.pre('save', async function (next) {
     const hash = await bcrypt.hash(this.password, saltRounds);
     this.password = hash;
     next();
});

module.exports = mongoose.model('User', UserSchema);
