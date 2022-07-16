const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    
    business_email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    }
});

storeSchema.index({location:"2dsphere"});  // index supports queries that calculate geometries on an earth-like sphere.
module.exports = mongoose.model("Store",storeSchema);