const express = require("express");
const app = express();
const cors = require('cors');
const config = require("./config/config");

app.use(cors({
    origin: '*'
}));



//user routes
const user_routes = require("./routes/userRoute");
app.get("/",(req,res)=>{
    res.send("Home")
})
app.use('/api',user_routes);

//store routes
const store_routes = require("./routes/storeRoute");
app.use('/api',store_routes);

//category routes
const category_routes = require("./routes/categoryRoute");
app.use('/api',category_routes);

//subcategory routes
const subcategory_route = require("./routes/subCategoryRoute");
app.use('/api',subcategory_route);

//product routes
const product_routes = require("./routes/productRoute");
app.use('/api',product_routes);

//common route
const common_route = require("./routes/commonRoute");
app.use('/api',common_route);

//cart route
const cart_route = require("./routes/cartRoute");
app.use('/api',cart_route);

//address route
const address_route = require("./routes/addressRoute");
app.use('/api',address_route);

//buy product routes
const buy_product_route = require("./routes/buyProductRoute");
app.use('/api',buy_product_route);


const start=()=>{
    try {
        const mongoose = require("mongoose");
        mongoose.connect(config.MONGO_URL);
    console.log("connect")
    } catch (error) {
        start()
    }
}
start()
app.listen(3000, function(){
    console.log("Server is ready");
});