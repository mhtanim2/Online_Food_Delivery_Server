const DataModel = require('../../models/MenuItem/ItemCategoryModel');
const ItemModel = require('../../models/MenuItem/ItemModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const DropDownService = require('../../services/common/DropDownService');
const DeleteService = require('../../services/common/DeleteService');
const CheckAssociateService = require('../../services/common/CheckAssociateService');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.CreateItemCategory = async (req, res) => {
  const Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};

exports.UpdateItemCategory = async (req, res) => {
  const Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};

exports.ItemCategoryList = async (req, res) => {
  try {
    const Result = await DataModel.find();
    res.status(200).json({ status: 'success', data: Result });
  } catch (error) {
    res.status(200).json({ status: 'fail', data: error.toSting });
  }
};
exports.CategoryTypesDropDown = async (req, res) => {
  const Result = await DropDownService(req, DataModel, { _id: 1, ItemCategory: 1 });
  res.status(200).json(Result);
};

exports.categoryWiseNumOfMenuItem = async (req, res) => {
  try {
    const Result = await DataModel.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'CategoryId',
          as: 'items',
        },
      },
      {
        $project: {
          category: '$CategoryName', // Replace 'CategoryName' with the actual field name for the category in the "DataModel" collection.
          ItemCategory: 1,
          numberOfMenuItems: { $size: '$items' },
        },
      },
      {
        $match: {
          numberOfMenuItems: { $gt: 0 }, // Filter out categories with no menu items
        },
      },
    ]);

    res.status(200).json({ status: 'success', data: Result });
  } catch (error) {
    res.status(200).json({ status: 'fail', data: error });
  }
};


exports.deleteCategory = async (req, res) => {

  let DeleteID = req.params.id;
  let CheckAssociate = await CheckAssociateService({ CategoryId: ObjectId(DeleteID) }, ItemModel);

  if (CheckAssociate) {
    res.status(200).json({ status: "associate", data: "Associate with Expenses" })
  }
  else {
    let Result = await DeleteService(req, DataModel);
    res.status(200).json(Result)
  }
}