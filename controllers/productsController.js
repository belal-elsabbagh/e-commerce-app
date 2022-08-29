const { addProduct } = require('../services').productServices;
const { validate } = require('../validation')
const { productSchema } = require('../validation').validationSchemas
/**
 * The products controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/products', async (req, res, next) => {
        try {
            res.status(200).json()
        }
        catch (err) {
            next(err)
        }
    });

    app.get('/products/:filter', async (req, res, next) => {
        try {
            res.status(200).json()
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/products', async (req, res, next) => {
        try {
            let newProduct = await validate(productSchema, req.body)
            res.status(201).json(await addProduct(newProduct));
        }
        catch (err) {
            next(err)
        }
    });
}