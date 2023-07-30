const UpdateService = async (Request, DataModel) => {
  try {
    const { id } = Request.params;
    const PostBody = Request.body;
    const data = await DataModel.updateOne({ _id: id }, PostBody);
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = UpdateService;
