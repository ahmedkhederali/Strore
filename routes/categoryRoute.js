const express = require("express");
const category_route = express();

const bodyParser = require("body-parser");
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const category_controller = require("../controllers/categoryController");

category_route.post('/add-catgeory',auth,category_controller.addCategory);
category_route.get('/get-catgeory',auth,category_controller.get_categoriesByID);


module.exports = category_route;