const ListOneJoinServiceCategory= async (Request, DataModel, JoinStage) => {
    try{

        let searchValue = Request.params.searchKeyword;
        
        let data;
        if (searchValue!=="0") {
            data = await DataModel.aggregate([
                JoinStage,
              
                {
                    $group: {
                      _id: "$category._id",
                      ItemCategory: { $first: "$category.ItemCategory" },
                      Items: {
                        $push: {
                          _id: "$_id",
                          ItemName: "$ItemName",
                          Description: "$Description",
                          UnitPrice: "$UnitPrice",
                          Discount: "$Discount",
                          ItemImage: "$ItemImage",
                          CreatedDate: "$CreatedDate"
                        }
                      }
                    }
                  }
            ])

        }

        else {
            data = await DataModel.aggregate([
                JoinStage,
                {
                $facet:{
                    Total:[{$count: "count"}],
                    Rows:[]
                }
                }
            ])
        }
        debugger;
        return {status: "success", data: data}
    
    }
    catch (error) {
        debugger;
        return {status: "fail", data: error}
    }
}

module.exports=ListOneJoinServiceCategory