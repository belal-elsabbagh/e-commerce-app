const {validate} = require('../validation')
const authorize = require('../auth')
const {constants: {AUTHORIZATION_RESOURCE_NAMES: resource}} = require('../config');
const {signupSchema, loginSchema, userSchema} = require('../validation/').validationSchemas.userSchemas
const {userServices} = require('../services/')
/**
 * The users controller
 * @param {Express} app
 */
module.exports = (app) => {

    app.get('/users', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:any', resource.user)
            res.status(STATUS_CODES.Success).json(await userServices.get(req.query))
        } catch (err) {
            next(err)
        }
    });

    app.get('/users/orders', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:any', resource.order)
            authorize(req.tokenData, 'read:any', resource.user)
            res.status(STATUS_CODES.Success).json(await userServices.getWithOrders(req.query))
        } catch (err) {
            next(err)
        }
    });

    app.get('/users/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'read:any', resource.user)
            let result = await userServices.getById(req.params.id)
            res.status(STATUS_CODES.Success).json(result)
        } catch (err) {
            next(err)
        }
    });

    app.post('/users', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'create:any', resource.user)
            let user = await validate(userSchema, req.body);
            res.status(STATUS_CODES.Created).json(await userServices.add(user));
        } catch (err) {
            next(err)
        }
    });

    app.post('/users/signup', async (req, res, next) => {
        try {
            let user = await validate(signupSchema, req.body);
            res.status(STATUS_CODES.Created).json(await userServices.add(user));
        } catch (err) {
            next(err)
        }
    });

    app.post('/users/login', async (req, res, next) => {
        try {
            let user = await validate(loginSchema, req.body);
            let userData = await userServices.login(user)
            res.status(STATUS_CODES.Success).json(userData);
        } catch (err) {
            next(err)
        }
    })

    app.delete('/users/:userId', async (req, res, next) => {
        try {
            authorize(req.tokenData, 'delete:any', resource.user)
            const userId = req.params.userId
            res.status(STATUS_CODES.Success).json(await userServices.delete(userId))
        } catch (err) {
            next(err)
        }
    })
}
