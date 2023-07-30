const ListOneJoinService = async (Request, DataModel, SearchArray, JoinStage) => {
  try {
    const searchValue = Request.params.searchKeyword;

    let data;
    if (searchValue !== '0') {
      data = await DataModel.aggregate([
        JoinStage,
        { $match: { $or: SearchArray } },
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [],
          },
        },
      ]);
    }
    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};

module.exports = ListOneJoinService;
