const mongoose = require('mongoose');

const CreateParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {
  // Create Transaction Session
  const session = await mongoose.startSession();

  try {
    // Begin Transaction
    await session.startTransaction();

    // First Database Process
    const { Parent } = Request.body;
    Parent.UserEmail = Request.headers.email;
    const ParentCreation = await ParentModel.create([Parent], { session });

    // Second Database Process
    const { Childs } = Request.body;
    await Childs.forEach((element) => {
      element[JoinPropertyName] = ParentCreation[0]._id;
      element.UserEmail = Request.headers.email;
    });

    const ChildsCreation = await ChildsModel.insertMany(Childs, { session });

    // Transaction Success
    await session.commitTransaction();
    session.endSession();

    return { status: 'success', Parent: ParentCreation, Childs: ChildsCreation };
  } catch (error) {
    // Roll Back Transaction if Fail
    await session.abortTransaction();
    session.endSession();
    return { status: 'fail', data: error };
  }
};
module.exports = CreateParentChildsService;
