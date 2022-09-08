let mongoose = require('mongoose')
const categoryModel = require('./category').model
const toObjectId = require('../lib/toObjectId')
const {NotFoundError} = require("../errors");
const {database} = require("../config");
let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: database.collections.category},
}, { timestamps: true })

productSchema.pre('save', async function () {
    let result = categoryModel.findById(this.categoryId);
    if (result === null) throw new NotFoundError(`Category with id '${this.categoryId}' was not found.`)
    this.categoryId = toObjectId(this.categoryId)
})

productSchema.static('getTotalPriceOfProducts', async function (products) {
    let totalPrice = 0;
    products.forEach(i => totalPrice += i.price)
    return totalPrice;
})

module.exports.schema = productSchema
module.exports.model = mongoose.model(database.collections.product, productSchema)