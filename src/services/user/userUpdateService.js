const userUpdateService = async (req, dataModel) => {
  try {
    const { firstName, lastName, mobile } = req.body;
    const user = await dataModel.updateOne(
      { email: req.headers.email },
      { firstName, lastName, mobile },
    );
    return { status: 'Success', data: user };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userUpdateService;
