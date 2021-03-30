const path = require("path");
const fs = require("fs");
const rootDir = require('../util/path');
const { json } = require("body-parser");
const e = require("express");




module.exports = class Cart{
    static addProduct(id, priceProduct){
        const p  = path.join(rootDir, 'data', 'cartProducts.json');
        fs.readFile(p, (err,fileContent)=>{
            let cart = {products:[],quantityPrice:0}
            if(!err){
                cart = JSON.parse(fileContent);
                let existingProductIndex = cart.products.findIndex(prod=>prod.id==id);
                let productFound = cart.products[existingProductIndex];
                if(productFound){
                    productFound.qty++;
                    cart.products[existingProductIndex] = productFound;
                }
                else{
                    productFound = {id:id, qty:1};
                    cart.products = [...cart.products, productFound];
                }
                cart.quantityPrice += priceProduct;
                fs.writeFile(p, JSON.stringify(cart), err=>{
                    console.log(err);
                })
            }
            else{
                let productAdd = {id:id, qty:1};
                cart.products.push(productAdd);
                cart.quantityPrice+=priceProduct;
                fs.writeFile(p, JSON.stringify(cart), err=>{
                    console.log(err);
                })
            }
        })

    }
}