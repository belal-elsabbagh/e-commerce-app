const {NotFoundError, InternalServerError, ForbiddenError} = require('../errors');
const {orderModel} = require('../models');
const {getProductById} = require('./product')

class OrderServices {
    constructor() {
        this.model = orderModel;
    }

    addOrder = async (orderObject) => {
        try {
            orderObject.products = await Promise.all(orderObject.products.map(async i => await getProductById(i)))
            return await this.model.create(orderObject)
        } catch (err) {
            throw err;
        }
    }

    getOrders = async (filter = {}) => {
        try {
            return await this.model.find(filter);
        } catch (err) {
            throw err;
        }
    }

    getOrderById = async (orderId) => {
        let queryResult = undefined
        try {
            queryResult = await this.model.findById(orderId)
        } catch (err) {
            throw new InternalServerError(`Failed to get order by id \'${orderId}\'.`)
        }
        if (queryResult === null) throw new NotFoundError(`Order with id \'${orderId}\' was not found.`);
        return queryResult;

    }

    updateOrder = async (orderId, updates) => {
        try {
            await this.getOrderById(orderId)
            return await this.model.findByIdAndUpdate(orderId, updates)
        } catch (err) {
            throw err
        }
    }

    deleteOrder = async (orderId) => {
        try {
            await this.getOrderById(orderId)
            return await this.model.findByIdAndDelete(orderId)
        } catch (err) {
            throw err
        }
    }

    deleteOwnOrder = async (orderId, userId) => {
        let order = undefined
        try {
            order = await this.getOrderById(orderId)
        } catch (err) {
            throw err
        }
        if (order.userId !== userId) throw new ForbiddenError('You are not authorized to delete this order.')
        return await this.model.findByIdAndDelete(orderId)
    }
}

module.exports = new OrderServices();