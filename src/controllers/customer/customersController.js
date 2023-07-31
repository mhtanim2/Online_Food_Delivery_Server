const bcrypt = require('bcrypt');
const User = require('../../models/customer/customerModel');
const Location = require('../../models/customer/customerLocationModel');  
const OTPModel = require('../../models/customer/OTPModel');
const sendEmailUtility = require('../../utility/sendEmailUtility');
const customerCreateService = require('../../services/user/customerCreateService');
const customerLoginService = require('../../services/user/customerLoginService');
const customerAddLocationSrvice = require('../../services/user/customerLocationService');

// registration
const registration = async (req, res) => {
  const result = await customerCreateService(req, User);
  if (result.data) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

// login
const login = async (req, res) => {
  const result = await customerLoginService(req, User);
  if (result.data && result.token) {
    return res.status(200).json(result);
  }
  return res.status(401).json(result);
};

// update profile
const updateProfile = async (req, res) => {
  const { email } = req.headers.user;
  try {
    const result = await User.updateOne({ email }, req.body);
    res.status(200).json({ status: 'Success', data: result });
  } catch (error) {
    res.status(400).json({ status: 'Success', data: error });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  const { email } = req.headers;
  try {
    const user = await User.aggregate([
      { $match: { email } },
      { $project: { createdAt: 0, updatedAt: 0 } },
    ]);
    res.status(200).json({ status: 'Success', data: user[0] });
  } catch (error) {
    res.status(400).json({ status: 'Success', data: error });
  }
};

// recover verify email
const recoverVerifyEmail = async (req, res) => {
  const { email } = req.params;
  const OTPCode = Math.floor(100000 + Math.random() * 900000);

  try {
    const result = await User.aggregate([
      { $match: { email } },
      { $count: 'total' },
    ]);

    if (result.length > 0) {
      await OTPModel.create({ email, otp: OTPCode });
      const SendEmail = await sendEmailUtility(email, OTPCode, 'OTP Code');

      res.status(200).json({ status: 'Success', data: SendEmail });
    } else {
      res.status(400).json({ status: 'Success', data: 'Email not found' });
    }
  } catch (error) {
    res.status(400).json({ status: 'Success', data: error });
  }
};

// recover verify OTP
const recoverVerifyOTP = async (req, res) => {
  const { email, otp } = req.params;

  try {
    const otpCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 0 } },
    ]);

    if (otpCount.length > 0) {
      const result = await OTPModel.updateOne(
        { email, otp, status: 0 },
        { status: 1 },
      );
      res.status(200).json({ status: 'Success', data: result });
    } else {
      res.status(400).json({ status: 'Success', data: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', data: error });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const otpCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 1 } },
    ]);
    if (otpCount.length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedPass = await User.updateOne(
        { email },
        { password: hashedPassword },
      );
      res.status(200).json({ status: 'Success', data: updatedPass });
    } else {
      res.status(400).json({ status: 'error', data: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', data: error });
  }
};

const addLocation = async(req, res) => {
  const result = await customerAddLocationSrvice(req, Location);
  if (result.data) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
}

const getLocations = async(req, res) => {
  const { id } = req.headers;
  try {
    const locations = await Location.find({ userId: id });
    res.status(200).json({ status: 'Success', data: locations });
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.toStrign() });
  }
}

const deleteLocation = async(req, res) => {
  console.log("locatino")
  const { userId, id } = req.params;
  try {
    const result = await Location.deleteOne({ _id: id, userId });
    res.status(200).json({ status: 'Success', data: result });
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.toStrign() });
  }
}

module.exports = {
  registration,
  login,
  updateProfile,
  getUserProfile,
  recoverVerifyEmail,
  recoverVerifyOTP,
  resetPassword,
  addLocation,
  getLocations,
  deleteLocation
};
