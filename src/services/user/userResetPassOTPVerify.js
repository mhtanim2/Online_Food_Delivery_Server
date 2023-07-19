const userResetPassOTPVerify = async (req, dataModel) => {
  const { email } = req.params;
  const { otp } = req.body;
  const status = 0;
  try {
    const otpCount = await dataModel.aggregate([
      {
        $match: { email, otp, status },
      },
      {
        $count: 'otpCount',
      },
    ]);
    if (otpCount[0].otpCount === 1) {
      const otpUpdate = await dataModel.updateOne(
        { email, otp, status },
        { status: 1 },
      );
      if (otpUpdate.nModified === 1) {
        return { status: 'Success', message: 'OTP verified!', data: otpUpdate };
      }
      return { status: 'fail', message: 'OTP not verified!' };
    }
    return { status: 'fail', message: 'Invalid OTP' };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userResetPassOTPVerify;
