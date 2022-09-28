const { ForbiddenError } = require('../errors');
const { orderModel } = require('../models');
const productServices = require('./product')
const BaseService = require('../models/BaseService');
const toObjectIdOfModel = require('../lib/toObjectIdOfModel');

class OrderServices extends BaseService {
    constructor() {
        super(orderModel);
    }

    async add(orderObject) {
        orderObject.products = await Promise.all(orderObject.products.map(async i => {
            return {
                product: await productServices.update(i.product, { $inc: { ordersCount: 1 } }),
                quantity: i.quantity
            }
        }))
        console.log(orderObject.products)
        return this.model.create(orderObject)
    }

    async deleteOwnOrder(orderId, userId) {
        const order = await super.getById(orderId)
        if (order.userId !== userId) throw new ForbiddenError('You are not authorized to delete this order.')
        return this.model.findByIdAndDelete(orderId)
    }

    async orderBelongsToUser(orderId, userId) {
        return this.model.checkOrderUser(orderId, userId)
    }
}

module.exports = new OrderServices();
