const path = require('path')
const fs = require('fs')

// initial file json to save
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            callback([]);
        }
        callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title, imageUrl, price, description ){
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(callback){
        getProductsFromFile(callback);
    }
}