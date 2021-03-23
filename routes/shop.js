

const express = require('express');

const productsFunctionality = require('../controllers/products');


const router = express.Router();

router.get('/', productsFunctionality.getShopProducts);

router.get("/products", productsFunctionality.getProductsUser)

module.exports = router;
