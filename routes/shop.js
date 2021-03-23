

const express = require('express');

const productsFunctionality = require('../controllers/products');


const router = express.Router();

router.get('/', productsFunctionality.getShopProducts);

module.exports = router;
