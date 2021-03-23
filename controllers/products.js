
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product',{PageTitle:"Add Product",path:"admin"})
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.addProduct();
    // console.log(products);
    res.redirect('/');
  };

exports.getShopProducts = (req, res, next) => {
    // console.log("Shop", adminData.products);
    Product.FetchProducts((products)=>{
        res.render('shop',{prods:products,docTitle:"My Shop",path:"shop"})
    });
    
  };