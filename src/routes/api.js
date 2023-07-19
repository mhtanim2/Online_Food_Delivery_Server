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

const router = express.Router();

router.get('/status', ItemController.status); // Checking Status

// user related API
router.post('/registration', registration);
router.get('/profile', authVerifyMiddleware, getUserProfile);
router.post('/login', login);
router.post('/updateProfile', authVerifyMiddleware, updateProfile);
router.get('/recoverVerifyEmail/:email', recoverVerifyEmail);
router.get('/recoverVerifyOTP/:email/:otp', recoverVerifyOTP);
router.post('/resetPassword', resetPassword);

// Item Category
router.post('/CreateItemCategory', ItemCategoryController.CreateItemCategory);
router.post(
  '/UpdateItemCategory/:id',
  ItemCategoryController.UpdateItemCategory,
);
router.get('/ItemCategoryList', ItemCategoryController.ItemCategoryList);

// Menu Item
router.post('/CreateItem', ItemController.CreateItem);
router.post('/UpdateItem/:id', ItemController.UpdateItem);
router.get(
  '/ItemList/:pageNo/:perPage/:searchKeyword',
  ItemController.ItemList,
);

module.exports = router;
