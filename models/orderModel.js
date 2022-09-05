let mongoose = require('mongoose');
let productModel = require('./productModel')
const {ForbiddenError} = require("../errors");
const toObjectIdArray = require('../lib/toObjectIdArray')
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
    order.totalPrice = await productModel.getTotalPriceOfProducts(order.productIds);
    order.productIds = toObjectIdArray(order.productIds);
    next();
})

module.exports = mongoose.model('orders', orderSchema)