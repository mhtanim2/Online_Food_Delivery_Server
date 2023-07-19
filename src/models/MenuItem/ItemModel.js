const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    CategoryId:{type:mongoose.Schema.Types.ObjectId},
    ItemName:{type:String},
    Description: {type:String},
    UnitPrice: {type:String},
    Discount:{type:String},
    ItemImage:{type:String},
    CreatedDate:{type:Date,default:Date.now()}
    },{versionKey:false});
const ItemModel=mongoose.model('Item',DataSchema);
module.exports=ItemModel