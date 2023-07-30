const ListOneJoinServiceCategory = async (Request, DataModel, JoinStage) => {
  try {
    const data = await DataModel.aggregate([
      JoinStage,
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
