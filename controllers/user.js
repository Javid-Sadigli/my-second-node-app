const Product = require("../models/product");

module.exports.GET_Home = (req,res,next) => {
    Product.findAll().then((products) => {
        res.render('user/home', {PageTitle : 'Home', products: products});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Shop = (req,res,next) => {
    res.render('user/shop', {PageTitle : 'Shop'});
};
module.exports.GET_Card = (req,res,next) => {
    req.user.getCard().then((card) => {
        return card.getProducts();
    }).then((products) => {
        res.render('user/card', {PageTitle : 'Card', products : products});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Orders = (req,res,next) => {
    res.render('user/orders', {PageTitle : 'Orders'});
};
module.exports.GET_Product_Details = (req,res,next) => {
    const productId = req.query.id;
    Product.findByPk(productId).then((product) => {
        res.render('user/product-details', {PageTitle : 'Details', product: product});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Add_To_Card = (req, res, next) => {
    const productId = req.params.productId;
    let MyCard;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts({where : {id: productId}});
    }).then((products) => {
        const product = products[0];
        if(product)
        {
            
        }
        return Product.findByPk(productId);
    }).then((product) => {
        return MyCard.addProduct(product, {through : {
            amount : 1
        }});
    }).then(() => {
        res.redirect('/card');
    })
};
