const bcrypt = require('bcrypt');

const customerCreateService = async (req, DataModel) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new DataModel({
      ...req.body,
      password: hashedPassword,
    });
    const result = await newUser.save();

    return { data: result, message: 'User was added successfully.' };
  } catch (error) {
    return { message: 'Unknown error occured!', error: error.toString() };
  }
};

module.exports = customerCreateService;
