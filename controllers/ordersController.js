const { validate } = require('../validation')
const authorize = require('../auth')
const { getOrders, addOrder, deleteOwnOrder } = require('../services').orderServices;
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants');
/**
 * The users controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/orders', async (req, res, next) => {
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
            const newOrder = await validate({
                userId: req.tokenData.user.id,
                productIds: req.body.productIds,
                shippingAddress: req.body.shippingAddress,
                phoneNumber: req.body.phoneNumber,
            })
            res.status(201).json(await addOrder(newOrder));
        }
        catch (err) {
            next(err)
        }
    });

    app.delete('/orders/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'delete:own', resource.order)
            res.status(200).json(await deleteOwnOrder(req.params.id, req.tokenData.user.id));
        }
        catch (err) {
            next(err)
        }
    })
}