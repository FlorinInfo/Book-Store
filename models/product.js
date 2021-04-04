
const path = require("path");
const { json } = require("body-parser");
const db = require("../util/database");

module.exports = class Product{
    constructor(t, imageUrl, price, description){
        this.title = t;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.addedCart = false;
    }

    addProduct(){
       return db.execute("INSERT INTO products (title, price,description,imageUrl) VALUES (?, ?, ?, ?)", 
        [this.title, this.price, this.description,this.imageUrl ]);
    }

    static editProduct(id, product){
    }

    static findById(id) {
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    }

    static FetchProducts(){
        return db.execute("SELECT * FROM products");
    }
}