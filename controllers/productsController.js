const {
    productServices: {addProduct, getProducts},
    categoryServices: {addCategory, getCategories, getCategoryById}
} = require('../services');
const {validate} = require('../validation')
const authorize = require('../auth')
const {AUTHORIZATION_RESOURCE_NAMES: resource} = require('../config/constants');
const {productSchema, categorySchema} = require('../validation').validationSchemas

/**
 * The products controller
 * @param {Express} app
 */
module.exports = (app) => {
    app.get('/products', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:any', resource.product)
            res.status(200).json(await getProducts())
        } catch (err) {
            next(err)
        }
    });

    app.get('/products/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:any', resource.product)
            res.status(200).json(await getCategories({}))
        } catch (err) {
            next(err)
        }
    })

    app.get('/products/:categoryId', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:any', resource.product)
            res.status(200).json(await getProducts({category: req.params.categoryId}))
        } catch (err) {
            next(err)
        }
    });

    app.post('/products', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'create:any', resource.product)
            let newProduct = await validate(productSchema, req.body)
            res.status(201).json(await addProduct(newProduct));
        } catch (err) {
            next(err)
        }
    });

    app.post('/products/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'create:any', resource.productCategory)
            let newCategory = await validate(categorySchema, req.body)
            res.status(201).json(await addCategory(newCategory));
        } catch (err) {
            next(err)
        }
    });
}