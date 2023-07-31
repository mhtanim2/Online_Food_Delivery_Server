const DeleteService = async (Request, Model) => {
  try {
    const DeleteID = Request.params.id;

    const QueryObject = {};
    QueryObject["_id"] = DeleteID;
    
    const Delete = await Model.deleteMany(QueryObject);
    return { status: 'success', Delete };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = DeleteService;
