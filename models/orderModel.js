let mongoose = require('mongoose');
let productModel = require('./productModel')
let orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productIds: [mongoose.Schema.Types.ObjectId],
    dateCreated: { type: Date, default: Date.now() },
    shippingAddress: String,
    phoneNumber: String,
    totalPrice: { type: Number },
    status: { type: String, default: 'pending' }
})

/**
 * 
 * @param {Array.<string>} ids 
 * @returns {Array.<mongoose.Schema.Types.ObjectId>}
 */
function toObjectId(ids) {
    if (ids.constructor === Array) return ids.map(mongoose.Types.ObjectId);
    return [mongoose.Types.ObjectId(ids)];
}

orderSchema.pre('save', async function (next) {
    let order = this;
    order.totalPrice = await productModel.getTotalPriceOfProducts(order.productIds);
    order.productIds = toObjectId(order.productIds);
    next();
})

module.exports = mongoose.model('orders', orderSchema)