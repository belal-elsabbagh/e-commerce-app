let mongoose = require('mongoose')
const categoryModel = require('./category').model
const toObjectIdOfModel = require('../lib/toObjectIdOfModel')
const {NotFoundError, InternalServerError} = require('../errors');
const {database} = require('../config');
let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: database.collections.category},
    ordersCount: {type: Number, default: 0}
}, {
    collection: database.collections.product,
    timestamps: true
})

productSchema.pre('save', async function () {
    let result = categoryModel.findById(this.category);
    if (result === null) throw new NotFoundError(`No category was found having this id.`, {id: this.categoryId})
    this.category = toObjectIdOfModel(categoryModel, this.category)
})

productSchema.statics.getTotalPriceOfProducts = async function (products) {
    let totalPrice = products.reduce((total, product) => {
        return total + product.price
    }, 0)
    return totalPrice;
}

module.exports = {
    schema: productSchema,
    model: mongoose.model(database.collections.product, productSchema, database.collections.product)
}
