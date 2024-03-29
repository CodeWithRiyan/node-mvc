const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.render('admin/add-product', {pageTitle:'Add Product', path:'/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true});
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}

exports.postProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.listProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/list-product', {prods:products, pageTitle:'List Product', path:'/admin/products'});
    });
}
