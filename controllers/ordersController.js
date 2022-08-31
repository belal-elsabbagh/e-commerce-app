const { validate } = require('../validation')
const authorize = require('../auth')
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants');
/**
 * The users controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/orders', async (req, res, next) => {
        try {
            res.status(200).json()
        }
        catch (err) {
            next(err)
        }
    });

    app.get('/orders/:filter', async (req, res, next) => {
        try {
            res.status(200).json()
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/orders', async (req, res, next) => {
        try {
            let data = {
                userId: req.tokenData.id,
                productIds: req.body.productIds,
                shippingAddress: req.body.shippingAddress,
                phoneNumber: req.body.phoneNumber,
            }
            res.status(201).json();
        }
        catch (err) {
            next(err)
        }
    });
}