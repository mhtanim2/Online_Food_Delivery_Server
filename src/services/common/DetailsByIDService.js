const mongoose = require('mongoose');

const DetailsByIDService = async (Request, DataModel) => {
  try {
    const DetailsID = Request.params.id;
    const UserEmail = Request.headers.email;

    const { ObjectId } = mongoose.Types;
    const QueryObject = { _id: ObjectId(DetailsID), UserEmail };

    const data = await DataModel.aggregate([
      { $match: QueryObject },
    ]);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = DetailsByIDService;
