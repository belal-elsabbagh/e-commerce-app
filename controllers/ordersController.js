const { validate } = require('../validation')
const authorize = require('../auth')
const { getOrders, addOrder } = require('../services').orderServices;
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants');
/**
 * The users controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:own', resource.order)
            res.status(200).json(await getOrders({ userId: req.tokenData.user.id }))
        }
        catch (err) {
            next(err)
        }
    });

    app.get('/orders/all', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:any', resource.order)
            res.status(200).json(await getOrders())
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'create:own', resource.order)
            let data = {
                userId: req.tokenData.user.id,
                productIds: req.body.productIds,
                shippingAddress: req.body.shippingAddress,
                phoneNumber: req.body.phoneNumber,
            }
            const newOrder = await validate(data)
            res.status(201).json(await addOrder(newOrder));
        }
        catch (err) {
            next(err)
        }
    });
}