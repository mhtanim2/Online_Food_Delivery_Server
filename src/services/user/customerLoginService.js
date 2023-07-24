const bcrypt = require('bcrypt');
const createToekn = require('../../utility/createToken');

const customerLoginService = async (req, DataModel) => {
  try {
    const userCursor = await DataModel.aggregate([
      {
        $match: {
          email: req.body.email,
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
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (isValidPassword) {
        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNo: user.phoneNo,
          photo: user.photo,
        };

        const token = createToekn(payload);
        return { status: 'Success', token, data: payload };
      }
      return { msg: 'Login failed! Please try again.' };
    }
    return { msg: 'Login failed! Please try again.' };
  } catch (error) {
    return { msg: error.message };
  }
};

module.exports = customerLoginService;
