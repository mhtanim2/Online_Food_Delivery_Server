const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  city: { type: String, required: true },
  streetNumber: { type: String, required: true },
  houseNo: { type: String, required: true },
  floorNo: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

const CustomerLocation = mongoose.model('customerLocation', dataSchema);

module.exports = CustomerLocation;
