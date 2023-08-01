const ListOneJoinServiceCategory = async (Request, DataModel, SearchArray, JoinStage) => {
  try {
    const searchValue = Request.params.searchKeyword;
    let data;
    //Unary operator
    (searchValue !== '0') ? data = await DataModel.aggregate([
      JoinStage,
      {
        $unwind: '$category',
      },
      { $match: { $or: SearchArray } },
      {
        $group: {
          _id: '$category._id',
          ItemCategory: { $first: '$category.ItemCategory' },
          Items: {
            $push: {
              _id: '$_id',
              ItemName: '$ItemName',
              Description: '$Description',
              UnitPrice: '$UnitPrice',
              Discount: '$Discount',
              ItemImage: '$ItemImage',
              CreatedDate: '$CreatedDate',
            },
          },
        },
      },
    ]) : data = await DataModel.aggregate([
      JoinStage,
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category._id',
          ItemCategory: { $first: '$category.ItemCategory' },
          Items: {
            $push: {
              _id: '$_id',
              ItemName: '$ItemName',
              Description: '$Description',
              UnitPrice: '$UnitPrice',
              Discount: '$Discount',
              ItemImage: '$ItemImage',
              CreatedDate: '$CreatedDate',
            },
          },
        },
      },
    ]);



    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};

module.exports = ListOneJoinServiceCategory;
