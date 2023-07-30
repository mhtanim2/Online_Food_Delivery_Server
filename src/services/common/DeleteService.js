const DeleteService = async (Request, Model) => {
  try {
    const DeleteID = Request.params.id;
    const UserEmail = Request.headers.email;

    const QueryObject = {};
    QueryObject._id = DeleteID;
    QueryObject[UserEmail] = UserEmail;

    const Delete = await Model.deleteMany(QueryObject);
    return { status: 'success', Delete };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = DeleteService;
