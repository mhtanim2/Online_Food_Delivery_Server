const { Schema, model } = require('mongoose');

const dataSehema = Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: String },
    password: { type: String },
    photo: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const Customer = model('customer', dataSehema);

module.exports = Customer;
