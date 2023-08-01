const DataModel = require('../../models/MenuItem/ItemModel');
const CreateService = require('../../services/common/CreateService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const UpdateService = require('../../services/common/UpdateService');
const ListOneJoinServiceCategory = require('../../services/common/ListOneJoinServiceCategory');
const DeleteService = require('../../services/common/DeleteService');
exports.status = async (req, res) => {
  res.status(200).json({ status: 'success', message: 'The backend is running' });
};

exports.CreateItem = async (req, res) => {
  const Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};

exports.ItemList = async (req, res) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const JoinStage = {
    $lookup: {
      from: 'itemcategories', localField: 'CategoryId', foreignField: '_id', as: 'category',
    },
  };
  const SearchArray = [{ ItemName: SearchRgx }, { 'category.ItemCategory': SearchRgx }];
  const Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
  res.status(200).json(Result);
};

exports.UpdateItem = async (req, res) => {
  const Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};

exports.categoryWiseItems = async (req, res) => {
  console.log('requested');
  try {
    const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    const JoinStage = {
      $lookup: {
        from: 'itemcategories',
        localField: 'CategoryId',
        foreignField: '_id',
        as: 'category',
      },
    };
    const SearchArray = [{ ItemName: SearchRgx }, { 'category.ItemCategory': SearchRgx }];
    const Result = await ListOneJoinServiceCategory(req, DataModel, SearchArray, JoinStage);
    res.status(200).json(Result);
  } catch (error) {
    res.status(200).json(Result);
  }
};

exports.deleteItem = async (req, res) => {

  let Result = await DeleteService(req, DataModel);
  res.status(200).json(Result)
}