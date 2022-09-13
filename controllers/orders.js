const {validate} = require('../validation')
const authorize = require('../auth')
const {validationSchemas: {orderSchema}} = require('../validation')
const {orderServices} = require('../services');
const {constants: {AUTHORIZATION_RESOURCE_NAMES: resource}} = require('../config');
const mongoose = require("mongoose");
/**
 * The users controller
 * @param {Express} app
 */
module.exports = (app) => {

    app.get('/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:any', resource.order)
            res.status(200).json(await orderServices.get(req.query))
        } catch (err) {
            next(err)
        }
    });

    app.get('/users/:userId/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:own', resource.order, req.params.userId)
            res.status(200).json(await orderServices.get({userId: new mongoose.Types.ObjectId(req.params.userId)}))
        } catch (err) {
            next(err)
        }
    });

    app.post('/users/:userId/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'create:own', resource.order, req.params.userId)
            const parsedOrderData = {
                userId: req.params.userId,
                products: req.body.products,
                shippingAddress: req.body.shippingAddress,
            }
            const newOrder = await validate(orderSchema, parsedOrderData)
            res.status(201).json(await orderServices.add(newOrder));
        } catch (err) {
            next(err)
        }
    });

    app.delete('/users/:userId/orders/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'delete:own', resource.order, req.params.userId)
            res.status(200).json(await orderServices.deleteOwnOrder(req.params.id, req.tokenData.user.id));
        } catch (err) {
            next(err)
        }
    })
}