const express = require("express");
const store_route = express();

const bodyParser = require("body-parser");
store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({extended:true}));
const auth = require("../middleware/auth");
const store_controller = require("../controllers/storeController");

store_route.post('/create-store',store_controller.create_store);
store_route.get('/get-store2',store_controller.get_store2);
store_route.post('/find-nearest-store',auth,store_controller.find_store);

//store_route.post('/find-nearest-store',store_controller.find_store);

module.exports = store_route;