const {ForbiddenError} = require('../errors');
const {orderModel} = require('../models');
const {getProductById} = require('./product')
const BaseService = require("./BaseService");

class OrderServices extends BaseService {
    constructor() {
        super(orderModel);
    }

    async add(orderObject) {
        orderObject.products = await Promise.all(orderObject.products.map(async i => await getProductById(i)))
        return await this.model.create(orderObject)
    }

    async deleteOwnOrder(orderId, userId) {
        const order = await super.getById(orderId)
        if (order.userId !== userId) throw new ForbiddenError('You are not authorized to delete this order.')
        return await this.model.findByIdAndDelete(orderId)
    }
}

module.exports = new OrderServices();