const Product = require('../models/product');

exports.getProducts = (req, res, next) => { 
    Product.find()
    .then(products => {
        return res.render('admin/product-list', {
            pageTitle: 'Products',
            path: '/admin/products',            
            products: products
        });
    })
    .catch(err => console.log('Error fetching products', err));    
}

exports.getAddProduct = (req, res, next) => {
    return res.render('admin/product-form', {
        pageTitle: 'Add Product',
        path: '/admin/products',
        editing: false
    });
}

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.redirect('/admin/products');
        }
        res.render('admin/product-form', {
            pageTitle: 'Edit Product',
            path: '/admin/products',
            editing: true,
            product: product
        });
    })
    .catch(err => console.log('Error fetching product', err));
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const rating = req.body.rating;
    const prod = new Product({
        title: title, 
        price: price, 
        imageUrl: imageUrl,
        description: description,
        meta: {rating: rating}
    });
    prod.save()
    .then(result => {
        console.log('Added product successfully!')
        return res.redirect('/admin/products');
    })
    .catch(err => console.log('Error adding product', err));
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const rating = req.body.rating;
    Product.findById(id)
    .then(product => {
        product.title = title;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;
        product.meta.rating = rating;
        return product.save();        
    })
    .then(result => {
        console.log('Edited product successfully!')
        return res.redirect('/admin/products');
    })
    .catch(err => console.log('Error fetching product', err));
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findByIdAndRemove(id)
    .then(result => {
        console.log('Deleted product successfully!')
        return res.redirect('/admin/products');
    })    
    .catch(err => console.log('Error deleting product', err));
}
