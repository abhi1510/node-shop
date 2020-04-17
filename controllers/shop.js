const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        return res.render('shop/product-list', {
            pageTitle: 'Products',
            path: '/products',
            products: products
        });
    })
    .catch(err => console.log('Error fetching products', err));    
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        return res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    })
    .catch(err => console.log('Error fetching product', err));    
}
