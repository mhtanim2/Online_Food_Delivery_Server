const ListService = async (Request, DataModel, SearchArray) => {
  try {
    const pageNo = Number(Request.params.pageNo);
    const perPage = Number(Request.params.perPage);
    const searchValue = Request.params.searchKeyword;
    const UserEmail = Request.headers.email;

    const skipRow = (pageNo - 1) * perPage;

    let data;

    if (searchValue !== '0') {
      const SearchQuery = { $or: SearchArray };
      data = await DataModel.aggregate([
        { $match: { UserEmail } },
        { $match: SearchQuery },
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        { $match: { UserEmail } },
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};
module.exports = ListService;
