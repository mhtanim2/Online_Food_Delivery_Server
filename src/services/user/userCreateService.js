const bcrypt = require('bcrypt');

const userCreateService = async (req, dataModel) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await dataModel.create({ ...body, password: hashedPassword });
    return { status: 'Success', data: user };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userCreateService;
