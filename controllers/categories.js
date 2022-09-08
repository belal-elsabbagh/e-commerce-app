const {categoryServices} = require('../services');
const {validate} = require('../validation')
const authorize = require('../auth')
const {AUTHORIZATION_RESOURCE_NAMES: resource} = require('../config/constants');
const {categorySchema} = require('../validation').validationSchemas

/**
 * The categories controller
 * @param {Express} app
 */
module.exports = (app) => {
    app.get('/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'read:any', resource.product)
            res.status(200).json(await categoryServices.get())
        } catch (err) {
            next(err)
        }
    })

    app.post('/categories', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'create:any', resource.productCategory)
            let newCategory = await validate(categorySchema, req.body)
            res.status(201).json(await categoryServices.add(newCategory));
        } catch (err) {
            next(err)
        }
    })

    app.patch('/categories/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'update:any', resource.productCategory)
            res.status(201).json(await categoryServices.update(req.params.id, req.body));
        } catch (err) {
            next(err)
        }
    })

    app.delete('/categories/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData.user.role, 'delete:any', resource.productCategory)
            res.status(200).json(await categoryServices.delete(req.params.id))
        } catch (err) {
            next(err)
        }
    })
}