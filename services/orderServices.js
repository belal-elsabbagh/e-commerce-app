const { NotFoundError, InternalServerError } = require('../middleware/errors');
const { orderModel } = require('../models');

class OrderServices {
    addOrder = async (orderObject) => {
        try {
            return await orderModel.create(orderObject);
        } catch (err) {
            throw err;
        }
    }

    getOrders = async (filter = {}) => {
        try {
            return await orderModel.find(filter);
        } catch (err) {
            throw err;
        }
    }

    getOrderById = async (orderId) => {
        try {
            let queryResult = await orderModel.findById(orderId)
            if (queryResult === null) throw new NotFoundError(`Order with id \'${id}\' was not found.`);
            return queryResult;
        } catch (err) {
            if(!(err instanceof NotFoundError)) throw new InternalServerError('Failed to get order by id \'${id}\'.')
            throw err
        }
    }

    updateOrder = async (orderId, updates) => {
        try { 
            this.getOrderById(orderId)
            return await orderModel.findByIdAndUpdate(orderId, updates)
        } catch (err) { 
            throw err 
        }
    }
}

module.exports = new OrderServices();