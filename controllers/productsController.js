const { addProduct, getProducts } = require('../services').productServices;
const { validate } = require('../validation')
const authorize = require('../auth')
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants');
const { productSchema } = require('../validation').validationSchemas

/**
 * The products controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/products', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'read:any', resource.product)
            res.status(200).json(await getProducts())
        }
        catch (err) {
            next(err)
        }
    });

    app.get('/products/:category', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'read:any', resource.product)
            res.status(200).json(await getProducts({ category: req.params.category }))
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/products', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'create:any', resource.product)
            let newProduct = await validate(productSchema, req.body)
            res.status(201).json(await addProduct(newProduct));
        }
        catch (err) {
            next(err)
        }
    });
}