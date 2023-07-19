const bcrypt = require('bcrypt');
const User = require('../../models/customer/customerModel');
const OTPModel = require('../../models/customer/OTPModel');
const sendEmailUtility = require('../../utility/sendEmailUtility');
const createToekn = require('../../utility/createToken');

// registration
const registration = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const result = await newUser.save();
    res
      .status(200)
      .json({ data: result, message: 'User was added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Unknown error occured!', error });
  }
};

// login
const login = async (req, res) => {
  try {
    const userCursor = await User.aggregate([
      {
        $match: {
          $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
        },
      },
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          phoneNo: 1,
          password: 1,
          photo: 1,
        },
      },
    ]);

    const user = userCursor[0];

    if (user && user.email) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        const payload = {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phoneNo: user.phoneNo,
          photo: user.photo,
        };

        const token = createToekn(payload);
        res.status(200).json({ status: 'Success', token, data: payload });
      } else {
        res.status(401).json({ msg: 'Login failed! Please try again.' });
      }
    } else {
      res.status(401).json({ msg: 'Login failed! Please try again.' });
    }
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
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

module.exports = {
  registration,
  login,
  updateProfile,
  getUserProfile,
  recoverVerifyEmail,
  recoverVerifyOTP,
  resetPassword,
};
