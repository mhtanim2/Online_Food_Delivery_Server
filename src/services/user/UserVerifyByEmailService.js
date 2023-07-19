const OTPModel = require('../../models/OTPModel');
const sendEmailUtility = require('../../utility/sendEmailUtility');

const userVerifyByEmailService = async (req, dataModel) => {
  try {
    const { email } = req.params;
    const user = await dataModel.aggregate([
      {
        $match: { email },
      },
      {
        $count: 'userCount',
      },
    ]);
    if (user[0].userCount === 1) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      await OTPModel.create({ email, otp, status: 0 });
      const sendMail = await sendEmailUtility(
        email,
        `Your OTP is ${otp}`,
        'OTP for reset password',
      );
      return {
        status: 'Success',
        message: 'OTP sent to your email address!',
        data: sendMail,
      };
    }
    return { status: 'fail', message: 'User not found!' };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userVerifyByEmailService;
