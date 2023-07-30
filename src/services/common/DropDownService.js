const DropDownService = async (Request, DataModel, Projection) => {
  try {
    // let UserEmail=Request.headers['email'];
    const data = await DataModel.aggregate([

      { $project: Projection },
    ]);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = DropDownService;
