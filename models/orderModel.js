let mongoose = require('mongoose');
let productModel = require('./productModel')
const toObjectIdOfModel = require('../lib/toObjectIdOfModel')
const userModel = require("./userModel");
let orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productIds: [mongoose.Schema.Types.ObjectId],
    dateCreated: { type: Date, default: Date.now() },
    shippingAddress: String,
    phoneNumber: String,
    totalPrice: { type: Number },
    status: { type: String, default: 'pending' }
})



orderSchema.static('orderBelongsToUser', async (orderId, userId) => {
    let order = await this.findById(orderId)
    return order.userId === userId
})

orderSchema.pre('save', async function (next) {
    let order = this;
    try {
        order.userId = await toObjectIdOfModel(userModel, order.userId)
        order.productIds = await Promise.all(order.productIds.map(i =>  toObjectIdOfModel(productModel, i)))
        order.totalPrice = await productModel.getTotalPriceOfProducts(order.productIds);
        next();
    } catch(err) {
        throw err
    }
})

module.exports = mongoose.model('orders', orderSchema)