const mongoose = require('mongoose');

const DeleteParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {
  const session = await mongoose.startSession();

  try {
    // Begin Transaction
    await session.startTransaction();

    // Parent Creation
    const DeleteID = Request.params.id;
    const UserEmail = Request.headers.email;

    const ChildQueryObject = {};
    ChildQueryObject[JoinPropertyName] = DeleteID;
    ChildQueryObject[UserEmail] = UserEmail;

    const ParentQueryObject = {};
    ParentQueryObject._id = DeleteID;
    ParentQueryObject[UserEmail] = UserEmail;

    // First Process
    const ChildsDelete = await ChildsModel.deleteMany(ChildQueryObject).session(session);

    // Second Process
    const ParentDelete = await ParentModel.deleteMany(ParentQueryObject).session(session);

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();
    return { status: 'success', Parent: ParentDelete, Childs: ChildsDelete };
  } catch (error) {
    // Roll Back Transaction
    await session.abortTransaction();
    session.endSession();
    return { status: 'fail', data: error };
  }
};
module.exports = DeleteParentChildsService;
