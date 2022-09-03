const {errors: {NotFoundError, InternalServerError, ForbiddenError}} = require('../types');
const {orderModel} = require('../models');

class OrderServices {
    constructor(model) {
        this.orderModel = model;
    }

    addOrder = async (orderObject) => {
        try {
            return await this.orderModel.create(orderObject);
        } catch (err) {
            throw err;
        }
    }

    getOrders = async (filter = {}) => {
        try {
            return await this.orderModel.find(filter);
        } catch (err) {
            throw err;
        }
    }

    getOrderById = async (orderId) => {
        let queryResult = undefined
        try {
            queryResult = await this.orderModel.findById(orderId)
        } catch (err) {
            throw new InternalServerError(`Failed to get order by id \'${orderId}\'.`)
        }
        if (queryResult === null) throw new NotFoundError(`Order with id \'${orderId}\' was not found.`);
        return queryResult;

    }

    updateOrder = async (orderId, updates) => {
        try {
            await this.getOrderById(orderId)
            return await this.orderModel.findByIdAndUpdate(orderId, updates)
        } catch (err) {
            throw err
        }
    }

    deleteOwnOrder = async (orderId, userId) => {
        let order = undefined
        try {
            order = await this.getOrderById(orderId)
        } catch (err) {
            throw new InternalServerError('Failed to get order by id \'${id}\'.')
        }
        if (order.userId !== userId) throw new ForbiddenError('You are not authorized to delete this order.')
        return await this.orderModel.findByIdAndDelete(orderId)

    }
}

module.exports = new OrderServices(orderModel);