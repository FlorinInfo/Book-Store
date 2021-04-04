
const Product = require("../models/product");
const Cart = require('../models/cart.js');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product',{PageTitle:"Add Product",path:"admin"})
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.addProduct().then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
    // console.log(products);
   
  };

exports.getShopProducts = (req, res, next) => {
    Product.FetchProducts().then(([rows,fieldsData]) => {
      res.render('shop/product-list',{prods:rows,docTitle:"My Shop",path:"shop"})
    }).catch((err) => {
      console.log(err);
    });
  };

  exports.getCart = (req, res, next) => {
    // Cart.FetchProductsCart(cart =>{
    //   if(cart){
    //     Product.FetchProducts(products=>{
    //         let productsFiltered = [];
    //         for(product of cart.products){
    //             let founded = products.find(pr => pr.id==product.id);
    //             if(founded){
    //               productsFiltered.push({products:founded,qty:product.qty});
    //             }
    //         }
    //         console.log(productsFiltered);
    //         res.render('shop/cart',{docTitle:"Cart",path:"cart",prods:productsFiltered})
    //     })
    // }
    // else{
    //   res.render('shop/cart',{docTitle:"Cart",path:"cart",prods:[]})
    // }
      
    // })
    
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
  Product.FetchProducts().then(([rows, fieldsData]) => {
    res.render('admin/adminProducts',{docTitle:"Admin Products",path:"adminProducts",prods:rows})
  }).catch((err) => {
    console.log(err);
  });
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  Product.findById(id).then(([product])=>{
    res.render('shop/product-details',{docTitle:`Product ${product[0].id}`,path:"productDetails",product:product[0]})
  })
  .catch( err=>
    console.log(err)
  );
};

exports.getEditProduct = (req, res, next) =>{
  const id = req.params.prodId;
  Product.findById(id, product=>{
    console.log(product)
    res.render('admin/editProducts',{PageTitle:"Add Product",path:"admin", product:product});
  })
}

exports.postEditProduct = (req, res, next) =>{
  let product = {
    id:req.params.prodId,
    title : req.body.title,
    imageUrl : req.body.imageUrl,
    price : req.body.price,
    description : req.body.description
  }

  Product.editProduct(req.params.prodId, product);

  res.redirect("/admin/products~")
}