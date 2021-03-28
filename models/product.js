
const path = require("path");
const rootDir = require('../util/path');
const fs = require("fs");
const { json } = require("body-parser");

module.exports = class Product{
    constructor(t, imageUrl, price, description){
        this.title = t;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.id = Math.random();
        this.addedCart = false;
    }

    addProduct(){
        let products = [];
        const p  = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err,fileContent) => {
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err);
            })
        })
    }

    static FetchProducts(cb){
        const p  = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                cb([]);
            }
           cb(JSON.parse(fileContent));
        })
    }
}