const bcrypt = require('bcrypt');
const OTPModel = require('../../models/OTPModel');

const userPasswordReset = async (req, dataModel) => {
  const { email } = req.body;
  const { password } = req.body;
  const { otp } = req.body;
  try {
    const otpCount = await OTPModel.aggregate([
      {
        $match: { email, otp, status: 1 },
      },
      {
        $count: 'otpCount',
      },
    ]);
    if (otpCount[0].otpCount === 1) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await dataModel.updateOne(
        { email },
        { password: hashedPassword },
      );
      return { status: 'Success', message: 'Password updated!', data: user };
    }
    return { status: 'fail', message: 'OTP is not verified!' };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};
module.exports = userPasswordReset;
