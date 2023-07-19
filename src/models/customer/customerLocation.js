const { default: mongoose, model } = require('mongoose');

const dataSchema = new mongoose.Schema({
  city: { type: String },
  streetNumber: { type: String },
  houseNo: { type: String },
  floorNo: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: false,
  },
});

const CustomerLocation = mongoose.model('customerLocation', dataSchema);
model.exports = CustomerLocation;
