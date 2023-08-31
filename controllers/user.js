const Product = require("../models/product");

module.exports.GET_Home = (req,res,next) => {
    Product.fetch_all((products) => {
        res.render('user/home', {PageTitle : 'Home', products: products});
    });
}

module.exports.GET_Shop = (req,res,next) => {
    res.render('user/shop', {PageTitle : 'Shop'});
}
module.exports.GET_Card = (req,res,next) => {
    res.render('user/card', {PageTitle : 'Card'});
}
module.exports.GET_Orders = (req,res,next) => {
    res.render('user/orders', {PageTitle : 'Orders'});
}
module.exports.GET_Product_Details = (req,res,next) => {
    const productId = req.query.id;
    Product.fetch_product_by_id(productId, (product) => {
        res.render('user/product-details', {PageTitle : 'Details', product: product});
    });
}