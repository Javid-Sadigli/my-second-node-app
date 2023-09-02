const ConsoleController = require('./console');

const Product = require("../models/product");

module.exports.GET_Add_Product = (req, res, next) => {
    res.render('admin/add-product', {PageTitle : 'Add Product'});
};

module.exports.POST_Add_Product = (req, res, next) => {
    const product = {
        title : req.body.title,
        description : req.body.description,
        image_link : req.body.image_link, 
        price : req.body.price
    }
    req.user.createProduct(product).then((result) => {
        res.redirect('/admin/add-product');
    }).catch((err) => {
        console.log(err);
    });
};

module.exports.GET_Products = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('admin/products', {PageTitle : 'Products', products: products});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Delete_Product = (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({where : {id : productId}}).then(() => {
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Edit_Product = (req, res, next) => {
    const productId = req.query.id;
    Product.findByPk(productId).then((product) => {
        res.render('admin/edit-product', {PageTitle : 'Edit Product', product: product});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Edit_Product = (req, res, next) => {
    Product.findByPk(req.body.id).then((product) => {
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.image_link = req.body.image_link;
        return product.save();
    }).then(() => {
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
        next();
    });
};