const Store = require("../models/storeModel");
const User = require("../models/userModel");

const create_store = async(req,res)=>{

    try {
        console.log("sssssssss")
        const userData = await User.findOne({ _id:req.body.vendor_id });
        console.log("wwwwwwwwwww")

        if(userData){
            if(!req.body.latitude || !req.body.longitude){
                res.status(200).send({success:false,msg:'lat and long is not found!'});
            }
            else{
                const vendorData = await Store.findOne({ vendor_id:req.body.vendor_id });
                if(vendorData){
                    res.status(200).send({success:false,msg:'This vendor is already created a store.'});
                }
                else{
                    const store = new Store({
                        vendor_id:req.body.vendor_id,
                       // logo:req.file.filename,
                        business_email:req.body.business_email,
                        address:req.body.address,
                        pin:req.body.pin,
                        location:{
                            type:"Point",
                            coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                        }
                    });

                    const storeData = await store.save();
                    res.status(200).send({success:false,msg:'Store Data',data:storeData});
                }
            }
        }
        else{
            res.status(200).send({success:false,msg:'Vendor ID does not exists.'});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }

}

const get_store = async(id)=>{
    try {
        return Store.findOne({_id:id});
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//get store BY ID
const get_store2 = async(req,res)=>{
    const id=req.body.id
    try {
        const data=await Store.findOne({_id:id})
        res.status(200).json({data})
        //return Store.findOne({_id:id});
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//find nearest store

const find_store = async(req,res)=>{

    try {
// to determind current location of user 
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        
        const store_data = await Store.aggregate([
            {
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",//Optional. Specify the geospatial indexed field to use when calculating the distance.
                    maxDistance:parseFloat(100)*1609,
                    distanceField:"dist.calculated",  //The output field that contains the calculated distance
                    spherical:true /*
                    Optional. Determines how MongoDB calculates the distance between two points:
                    When true, MongoDB uses $nearSphere semantics and calculates distances using spherical geometry.
                    When false, MongoDB uses $near semantics: spherical geometry for 2dsphere indexes and planar geometry for 2d indexes
                    */
                }
            }
        ]);

        res.status(200).send({ success:true,msg:"Store details",data:store_data });

    } catch (error) {
        console.log(error)
        res.status(400).send({ success:false,msg:error.message });
    }

}

module.exports = {
    create_store,
    get_store,
    find_store,
    get_store2
}