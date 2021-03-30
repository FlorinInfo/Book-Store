
const Product = require("../models/product");
const Cart = require('../models/cart.js');

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
      console.log(products)
        res.render('shop/product-list',{prods:products,docTitle:"My Shop",path:"shop"})
    });    
  };

  exports.getProductsUser = (req, res, next) => {
      res.render('shop/products',{docTitle:"Products",path:"products"})
  };

  exports.getCart = (req, res, next) => {
    Cart.FetchProductsCart(cart =>{
      if(cart){
        Product.FetchProducts(products=>{
            let productsFiltered = [];
            for(product of cart.products){
                let founded = products.find(pr => pr.id==product.id);
                if(founded){
                  productsFiltered.push({products:founded,qty:product.qty});
                }
            }
            console.log(productsFiltered);
            res.render('shop/cart',{docTitle:"Cart",path:"cart",prods:productsFiltered})
        })
    }
    else{
      res.render('shop/cart',{docTitle:"Cart",path:"cart",prods:[]})
    }
      
    })
    
};

exports.deleteCartProduct = (req, res, next) => {
  Cart.deleteProduct(req.body.prodId);
  res.redirect("/cart")

}

exports.postCart = (req, res, next) =>{
  const id = req.body.prodId;
  Product.findById(id, product=>{
    Cart.addProduct(id, Number(product.price));
  })
  res.redirect("/cart");
}

exports.getAdminProducts = (req, res, next) => {
  Product.FetchProducts((products)=>{
      res.render('admin/adminProducts',{docTitle:"Admin Products",path:"adminProducts",prods:products})
  })
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  Product.FetchProducts((products)=>{
      let productFound = products.filter(product => product.id == id);
      res.render('shop/product-details',{docTitle:`Product ${productFound[0].id}`,path:"productDetails",product:productFound[0]})
  })
};
