const express = require('express');



const ItemCategoryController = require("../controllers/MenuItem/ItemCategoryController");
const ItemController = require("../controllers/MenuItem/ItemController");
const router = express.Router();

router.get("/status", ItemController.status);//Checking Status


//Item Category
router.post("/CreateItemCategory", ItemCategoryController.CreateItemCategory);
router.post("/UpdateItemCategory/:id", ItemCategoryController.UpdateItemCategory);
router.get("/ItemCategoryList", ItemCategoryController.ItemCategoryList);

// Menu Item
router.post("/CreateItem", ItemController.CreateItem);
router.post("/UpdateItem/:id", ItemController.UpdateItem);
router.get("/ItemList/:pageNo/:perPage/:searchKeyword", ItemController.ItemList);


module.exports = router;