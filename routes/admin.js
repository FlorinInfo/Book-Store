const path = require('path');

const express = require('express');

const productsFunctionality = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsFunctionality.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsFunctionality.postAddProduct);

exports.routes = router;
 