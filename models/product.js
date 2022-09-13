let mongoose = require('mongoose')
const categoryModel = require('./category').model
const toObjectId = require('../lib/toObjectId')
const {NotFoundError} = require('../errors');
const {database} = require('../config');
let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: database.collections.category},
}, {
    collection: database.collections.product,
    timestamps: true
})

productSchema.pre('save', async function () {
    let result = categoryModel.findById(this.categoryId);
    if (result === null) throw new NotFoundError(`No category was found having this id.`, {id: this.categoryId})
    this.categoryId = toObjectId(this.categoryId)
})

productSchema.statics.getTotalPriceOfProducts = async function (products) {
    let totalPrice = 0;
    products.forEach(i => totalPrice += i.price)
    return totalPrice;
}

module.exports.schema = productSchema
module.exports.model = mongoose.model(database.collections.product, productSchema, database.collections.product)

