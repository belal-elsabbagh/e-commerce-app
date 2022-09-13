const {ForbiddenError} = require('../errors');
const {orderModel} = require('../models');
const productServices = require('./product')
const BaseService = require("../models/BaseService");

class OrderServices extends BaseService {
    constructor() {
        super(orderModel);
    }

    async add(orderObject) {
        orderObject.products = await Promise.all(orderObject.products.map(async i => {
            return await productServices.getById(i)
        }))
        return await this.model.create(orderObject)
    }

    async deleteOwnOrder(orderId, userId) {
        const order = await super.getById(orderId)
        if (order.userId !== userId) throw new ForbiddenError('You are not authorized to delete this order.')
        return await this.model.findByIdAndDelete(orderId)
    }

    async getMostOrderedProduct() {
        const res = await this.model.aggregate([
            {'$unwind': '$products'},
            {'$sortByCount': '$products._id'},
            {'$limit': 1}
        ])
        let product = JSON.parse(JSON.stringify(await productServices.getById(res[0]._id.toString())))
        product.timesOrdered = res[0].count
        return product
    }
}

module.exports = new OrderServices();