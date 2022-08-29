let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productIds: [mongoose.Schema.Types.ObjectId],
    dateCreated: { type: Date, default: Date.now() },
    shippingAddress: String,
    phoneNumber: String,
    totalPrice: Number,
})

orderSchema.pre('save', function(next) {
    const order = this
    if (order.isModified('productIds')) order.totalPrice = order.productIds.reduce((acc, curr) => acc + curr.productPrice, 0)
})

module.exports = mongoose.model('orders', orderSchema)