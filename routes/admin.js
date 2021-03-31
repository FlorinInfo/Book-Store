const path = require('path');

const express = require('express');

const productsFunctionality = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsFunctionality.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsFunctionality.postAddProduct);

router.get('/products', productsFunctionality.getAdminProducts);

router.get("/edit-product/:prodId", productsFunctionality.getEditProduct);

router.post("/edit-product/:prodId", productsFunctionality.postEditProduct);

exports.routes = router;
 