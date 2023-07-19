const DataModel = require("../../models/MenuItem/ItemModel");
const CreateService = require("../../services/common/CreateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const UpdateService=require("../../services/common/UpdateService");
exports.status = async (req, res) => {
    res.status(200).json({ status: "success", message: "The backend is running" })
}

exports.CreateItem = async (req, res) => {
    let Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}


exports.ItemList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "itemcategories", localField: "CategoryId", foreignField: "_id", as: "category" } };
    let SearchArray = [{ ItemName: SearchRgx }, { 'category.ItemCategory': SearchRgx }]
    debugger;
    let Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
    debugger;
    res.status(200).json(Result)

}

exports.UpdateItem=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}