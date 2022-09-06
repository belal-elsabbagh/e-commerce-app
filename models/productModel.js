let mongoose = require('mongoose')
const categoryModel = require('./categoryModel')
const toObjectId = require('../lib/toObjectId')
const {NotFoundError} = require("../errors");
let productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    categoryId: mongoose.Schema.Types.ObjectId,
    dateCreated: {type: Date, default: Date.now()},
})

productSchema.pre('save', async function () {
    let result = categoryModel.findById(this.categoryId);
    if (result === null) throw new NotFoundError(`Category with id '${this.categoryId}' was not found.`)
    this.categoryId = toObjectId(this.categoryId)
})

productSchema.static('getTotalPriceOfProducts', async function (productIds) {
    let totalPrice = 0;
    for (let i = 0; i < productIds.length; i++) {
        let product = await this.findById(productIds[i]);
        totalPrice += product.productPrice;
    }
    return totalPrice;
})

module.exports = mongoose.model('products', productSchema)