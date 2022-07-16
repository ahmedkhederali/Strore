var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    store_id:{
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    sub_cat_id:{
        type:String,
        required:true
    },
    
});



module.exports = mongoose.model("Product",productSchema);