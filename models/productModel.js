let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    category: String,
    dateCreated: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('products', productSchema)