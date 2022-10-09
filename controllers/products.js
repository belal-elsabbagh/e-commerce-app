const {productServices} = require('../services');
const {validate} = require('../validation')
const authorize = require('../auth')
const {
    AUTHORIZATION_RESOURCE_NAMES: resource,
    RESOURCE_ACCESS_ACTIONS: action,
    STATUS_CODES
} = require('../config/constants');
const {productSchema} = require('../validation').validationSchemas

/**
 * The products controller
 * @param {Express} app
 */
module.exports = app => {
    app.get('/products', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.read.any, resource.product)
            const {page, limit} = req.query
            res.status(STATUS_CODES.Success).json(await productServices.get(req.query, null, {page, limit}))
        } catch (err) {
            next(err)
        }
    });

    app.get('/products/bestseller', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.read.any, resource.product)
            res.status(STATUS_CODES.Success).json(await productServices.getMostOrderedProduct())
        } catch (err) {
            next(err)
        }
    });

    app.post('/products', async (req, res, next) => {
        try {
            await authorize(req.tokenData, action.create.any, resource.product)
            let newProduct = await validate(productSchema, req.body)
            res.status(STATUS_CODES.Created).json(await productServices.add(newProduct));
        } catch (err) {
            next(err)
        }
    });
}
