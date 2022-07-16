const Product = require("../models/productModel");
const Category_controller = require('../controllers/categoryController');
const Store_controller = require('../controllers/storeController');

const add_product = async(req,res)=>{

    try {
        
        var product = new Product({
            vendor_id:  req.body.vendor_id,
            store_id:   req.body.store_id,
            name :      req.body.name,
            price:   req.body.price,
            discount:   req.body.discount,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
           
        });

        const product_data = await product.save();

        res.status(200).send({ success:true,msg:"Product Details",data:product_data });

    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }

}

//get products method

const get_products = async(req,res)=>{

    try {
        var send_data = [];
        var cat_data = await Category_controller.get_categories(); //
        
        console.log("cat_data" + cat_data )
        if(cat_data.length > 0){
            for(let i =0; i< cat_data.length; i++){
                var product_data = [];
                var cat_id = cat_data[i]['_id'].toString();
                console.log(cat_id)
                var cat_pro = await Product.find({category_id:cat_id});
                console.log("cat_pro"+ cat_pro)
                if(cat_pro.length > 0){
                    for(let j =0; j<cat_pro.length;j++){
                        var store_data = await Store_controller.get_store(cat_pro[j]['store_id']);
                        product_data.push(
                            {
                                "prduct_name":cat_pro[j]['name'],
                        
                                "store_address":store_data['address']
                            }
                        );
                    }
                }
                send_data.push({
                    "category":cat_data[i]['category'],
                    "product":product_data
                });
            }
            res.status(200).send({success:true,msg:"Product Details",data:send_data});
        }
        else{
            res.status(200).send({ success:false,msg:"Product Details",data:send_data });
        }
    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }

}

//search product

const searchProduct = async(req,res)=>{

    try {
        
        var search = req.body.search;
        var product_data = await Product.find({ "name":{ $regex: ".*"+search+".*",$options:'i'} });
        if(product_data.length > 0){
            res.status(200).send({ success:true,msg:"Products Details",data:product_data });
        }
        else{
            res.status(200).send({ success:true,msg:"Products not found!" });
        }

    } catch (error) {
        res.status(400).send({ success:false,msg:error.message });
    }

}

//send data with pagination and srted form

const paginate = async(req,res)=>{

    try {
        
        var page = req.body.page;
        var sort = req.body.sort;

        var product_data;
        var skip;
        if(page <= 1){
            skip = 0;
        }
        else{
            skip = (page-1)*2;
        }

        if(sort){
            var customsort;
            if(sort == 'name'){
                customsort = {
                    name:1
                }
            }
            else if(sort == '_id'){
                customsort = {
                    _id:1
                }
            }
            product_data = await Product.find().sort(customsort).skip(skip).limit(2);
        }
        else{
            product_data = await Product.find().skip(skip).limit(2);
        }

        res.status(200).send({ success:true, msg:'Product Details', data:product_data });

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }

}

module.exports = {
    add_product,
    get_products,
    searchProduct,
    paginate
}