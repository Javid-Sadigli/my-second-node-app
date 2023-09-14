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
    let newAmount = 1;
    let product_price;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts({where : {id: productId}});
    }).then((products) => {
        const product = products[0];
        if(product)
        {
            newAmount = product.cardItem.amount + 1;
        }
        return Product.findByPk(productId);
    }).then((product) => {
        product_price = product.price;
        return MyCard.addProduct(product, {through : {
            amount : newAmount
        }});
    }).then(() => {
        MyCard.totalPrice += product_price;
        MyCard.save();
    }).then(() => {
        res.redirect('/card');
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Delete_From_Card = (req, res, next) => {
    const productId = req.params.productId;
    let product_price;
    let MyCard;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts({where : {
            id : productId
        }});
    }).then((products) => {
        const product = products[0];
        product_price = product.price * product.cardItem.amount;
        return product.cardItem.destroy();
    }).then(() => {
        MyCard.totalPrice -= product_price;
        return MyCard.save();
    }).then(() => {
        res.redirect('/card');
    }).catch((err) => {
        console.log(err);
    });
};
