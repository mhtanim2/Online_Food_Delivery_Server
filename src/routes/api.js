const express = require('express');
const ItemCategoryController = require('../controllers/MenuItem/ItemCategoryController');
const ItemController = require('../controllers/MenuItem/ItemController');
const {
  registration,
  getUserProfile,
  login,
  updateProfile,
  recoverVerifyEmail,
  recoverVerifyOTP,
  resetPassword,
} = require('../controllers/customer/customersController');
const authVerifyMiddleware = require('../middlewares/common/authVerifyModdleware');
const {
  addCustomerValidator,
  addCustomerValidationHandler,
} = require('../middlewares/customer/customerValidator');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/status', ItemController.status); // Checking Status

// customer API
router.post(
  '/registration',
  addCustomerValidator,
  addCustomerValidationHandler,
  registration,
);
router.get('/profile', authVerifyMiddleware, getUserProfile);
router.post('/login', login);
router.post('/updateProfile', authVerifyMiddleware, updateProfile);
router.get('/recoverVerifyEmail/:email', recoverVerifyEmail);
router.get('/recoverVerifyOTP/:email/:otp', recoverVerifyOTP);
router.post('/resetPassword', resetPassword);

// Item Category
router.post('/CreateItemCategory', ItemCategoryController.CreateItemCategory);
router.post('/UpdateItemCategory/:id', ItemCategoryController.UpdateItemCategory);
router.get('/ItemCategoryList', ItemCategoryController.ItemCategoryList);
router.get('/CategoryTypesDropDown', ItemCategoryController.CategoryTypesDropDown);
router.get('/categoryWiseNumOfMenuItem', ItemCategoryController.categoryWiseNumOfMenuItem);

// Menu Item
router.post('/CreateItem', ItemController.CreateItem);
router.post('/UpdateItem/:id', ItemController.UpdateItem);
router.get('/ItemList/:searchKeyword', ItemController.ItemList);
router.get('/categoryWiseItems',ItemController.categoryWiseItems);
module.exports = router;