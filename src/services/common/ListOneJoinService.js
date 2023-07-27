const ListOneJoinService= async (Request, DataModel, SearchArray, JoinStage) => {
    try{

        let searchValue = Request.params.searchKeyword;
        
        let data;
        if (searchValue!=="0") {
            data = await DataModel.aggregate([
                JoinStage,
                {$match: {$or: SearchArray}},
                {
                $facet:{
                    Total:[{$count: "count"}],
                    Rows:[]
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

module.exports=ListOneJoinService