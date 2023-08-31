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
    Product.create(product).then((result) => {
        ConsoleController.LOG_Created_Model('Product', product);
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/admin/add-product');
};
module.exports.GET_Products = (req, res, next) => {
    Product.fetch_all((products) => {
        res.render('admin/products', {PageTitle : 'Products', products: products});
    });
};
module.exports.POST_Delete_Product = (req, res, next) => {
    const productId = req.body.productId;
    Product.delete_product_by_id(productId);
    res.redirect('/admin/products');
};
module.exports.GET_Edit_Product = (req, res, next) => {
    const productId = req.query.id;
    Product.fetch_product_by_id(productId, (product) => {
        res.render('admin/edit-product', {PageTitle : 'Edit Product', product: product});
    });
};
module.exports.POST_Edit_Product = (req, res, next) => {
    Product.edit_product_by_id(req.body.id, req.body.title, req.body.description, req.body.image_link, req.body.price);
    res.redirect('/admin/products');
}