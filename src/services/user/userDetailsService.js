const userDatailsService = async (req, dataModel) => {
  try {
    const user = await dataModel.aggregate([
      {
        $match: { email: req.headers.email },
      },
    ]);
    return { status: 'Success', data: user };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};

module.exports = userDatailsService;
