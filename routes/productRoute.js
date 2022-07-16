const express = require("express");
const product_route = express();

const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({extended:true}));


const auth = require("../middleware/auth");

const product_controller = require("../controllers/productController");

product_route.post('/add-product',auth,product_controller.add_product);

product_route.get('/get-products',auth,product_controller.get_products);

product_route.get('/search-product',auth,product_controller.searchProduct);

product_route.post('/paginate',auth,product_controller.paginate);

module.exports = product_route;