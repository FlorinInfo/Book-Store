
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product',{PageTitle:"Add Product",path:"admin"})
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.addProduct();
    // console.log(products);
    res.redirect('/');
  };

exports.getShopProducts = (req, res, next) => {
    // console.log("Shop", adminData.products);
    Product.FetchProducts((products)=>{
        res.render('shop/product-list',{prods:products,docTitle:"My Shop",path:"shop"})
    });    
  };

  exports.getProductsUser = (req, res, next) => {
        res.render('shop/products',{docTitle:"Products",path:"products"})
  };

  exports.getCart = (req, res, next) => {
    res.render('shop/cart',{docTitle:"Cart",path:"cart"})
};

exports.getAdminProducts = (req, res, next) => {
  Product.FetchProducts((products)=>{
      res.render('admin/adminProducts',{docTitle:"Admin Products",path:"adminProducts",prods:products})
  })
};