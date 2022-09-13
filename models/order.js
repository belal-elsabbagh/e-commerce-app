let mongoose = require('mongoose');
let productModel = require('./product').model
const toObjectIdOfModel = require('../lib/toObjectIdOfModel')
const userModel = require('./user').model;
const productSchema = require('./product').schema
const { database } = require('../config');
let orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: database.collections.user },
    products: { type: [productSchema], ref: database.collections.product },
    shippingAddress: String,
    totalPrice: { type: Number },
    status: { type: String, default: 'pending' }
}, { collection: database.collections.order, timestamps: true })


orderSchema.static('checkOrderUser', async (orderId, userId) => {
    const order = await this.findById(orderId)
    return order.userId === userId
})

orderSchema.pre('save', async function (next) {
    let order = this;
    order.userId = await toObjectIdOfModel(userModel, order.userId)
    order.totalPrice = await productModel.getTotalPriceOfProducts(order.products);
    next();

})

module.exports.schema = orderSchema
module.exports.model = mongoose.model(database.collections.order, orderSchema, database.collections.order)
