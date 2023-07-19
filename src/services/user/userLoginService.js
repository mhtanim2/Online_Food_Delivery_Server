const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userLoginService = async (req, dataModel) => {
  try {
    const { body } = req;
    const user = await dataModel.aggregate([
      {
        $match: { email: body.email },
      },
    ]);
    if (user.length === 0) {
      return { status: 'fail', message: 'User not found!' };
    }
    const isValidPassword = await bcrypt.compare(
      body.password,
      user[0].password,
    );
    if (!isValidPassword) {
      return { status: 'fail', message: 'Invalid password!' };
    }
    const payload = {
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      email: user[0].email,
      mobile: user[0].mobile,
      photo: user[0].photo,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    return { status: 'Success', token, data: payload };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userLoginService;
