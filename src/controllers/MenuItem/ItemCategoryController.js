const DataModel = require("../../models/MenuItem/ItemCategoryModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService")
exports.CreateItemCategory = async (req, res) => {
    let Result = await CreateService(req, DataModel)
    debugger;
    res.status(200).json(Result)
}

exports.UpdateItemCategory = async (req, res) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.ItemCategoryList = async (req, res) => {
    try {
        let Result = await DataModel.find();
        res.status(200).json({ status: "success", data: Result });
    }

    catch (error) {

        res.status(200).json({ status: "fail", data: error.toSting });
    }


}

