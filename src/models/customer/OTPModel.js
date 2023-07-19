const { Schema, model } = require('mongoose');

const OTPSchema = Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
  },

  { versionKey: false, timestamps: true },
);

const OTP = model('otp', OTPSchema);

module.exports = OTP;
