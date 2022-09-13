const {categoryServices} = require('../services');
const {validate} = require('../validation')
const authorize = require('../auth')
const {constants: {AUTHORIZATION_RESOURCE_NAMES: resource}} = require('../config');
const {categorySchema} = require('../validation').validationSchemas

/**
 * The categories controller
 * @param {Express} app
 */
module.exports = app => {
    app.get('/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:any', resource.product)
            res.status(STATUS_CODES.Success).json(await categoryServices.get(req.query))
        } catch (err) {
            next(err)
        }
    })

    app.post('/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'create:any', resource.productCategory)
            let newCategory = await validate(categorySchema, req.body)
            res.status(STATUS_CODES.Created).json(await categoryServices.add(newCategory));
        } catch (err) {
            next(err)
        }
    })

    app.patch('/categories/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'update:any', resource.productCategory)
            res.status(STATUS_CODES.Success).json(await categoryServices.update(req.params.id, req.body));
        } catch (err) {
            next(err)
        }
    })

    app.delete('/categories/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'delete:any', resource.productCategory)
            res.status(STATUS_CODES.Success).json(await categoryServices.delete(req.params.id))
        } catch (err) {
            next(err)
        }
    })
}
