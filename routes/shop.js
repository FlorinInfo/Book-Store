

const express = require('express');

const productsFunctionality = require('../controllers/products');


const router = express.Router();

router.get('/', productsFunctionality.getShopProducts);

router.get("/products", productsFunctionality.getProductsUser)

router.get("/cart", productsFunctionality.getCart)

router.get("/product/:productId", productsFunctionality.getProductDetails)

router.post("/cart", productsFunctionality.postCart)

module.exports = router;
