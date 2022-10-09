const {validate} = require('../validation')
const authorize = require('../auth')
const {validationSchemas: {orderSchema}} = require('../validation')
const {orderServices} = require('../services');
const toObjectId = require('../lib/toObjectId')
const {
    constants: {
        AUTHORIZATION_RESOURCE_NAMES: resource,
        RESOURCE_ACCESS_ACTIONS: action,
        STATUS_CODES
    }
} = require('../config');

/**
 * The users controller
 * @param {Express} app
 */
module.exports = app => {

    app.get('/orders', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.read.any, resource.order)
            const {page, limit} = req.query
            res.status(STATUS_CODES.Success).json(await orderServices.get(req.query, null, {page, limit}))
        } catch (err) {
            next(err)
        }
    });

    app.get('/users/:userId/orders', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.read.own, resource.order, req.params.userId)
            res.status(STATUS_CODES.Success).json(await orderServices.get({
                ...req.query,
                userId: toObjectId(req.params.userId)
            }, null, {page: req.query.page, limit: req.query.limit}))
        } catch (err) {
            next(err)
        }
    });

    app.post('/users/:userId/orders', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.create.own, resource.order, req.params.userId)
            const parsedOrderData = {
                userId: req.params.userId,
                products: req.body.products,
                shippingAddress: req.body.shippingAddress,
            }
            const newOrder = await validate(orderSchema, parsedOrderData)
            res.status(STATUS_CODES.Created).json(await orderServices.add(newOrder));
        } catch (err) {
            next(err)
        }
    });

    app.delete('/users/:userId/orders/:id', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.delete.own, resource.order, req.params.userId)
            const orderId = req.params.id;
            const userId = req.params.userId;
            res.status(STATUS_CODES.Success).json(await orderServices.deleteOwnOrder(orderId, userId));
        } catch (err) {
            next(err)
        }
    })
}
