const { validate } = require('../validation')
const authorize = require('../auth')
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants');
const { signupSchema, loginSchema } = require('../validation/').validationSchemas.userSchemas
const { addUser, deleteUser, getUsers, getUserById, login } = require('../services/').userServices
/**
 * The users controller
 * @param {Express} app 
 */
module.exports = (app) => {

    app.get('/users', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'read:any', resource.user)
            res.status(200).json(await getUsers())
        }
        catch (err) {
            next(err)
        }
    });

    app.get('/users/:id', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'read:any', resource.user)
            let result = await getUserById(req.params.id)
            res.status(200).json(result)
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/users', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'create:any', resource.user)
            let user = await validate(signupSchema, req.body);
            res.status(201).json(await addUser(user));
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/users/signup', async (req, res, next) => {
        try {
            let user = await validate(signupSchema, req.body);
            res.status(201).json(await addUser(user));
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/users/login', async (req, res, next) => {
        try {
            let user = await validate(loginSchema, req.body);
            let userToken = await login(user)
            res.status(200).json(userToken);
        }
        catch (err) {
            next(err)
        }
    })

    app.delete('/users/:userId', async (req, res, next) => {
        try {
            authorize(req.tokenData.role, 'delete:any', resource.user)
            const userId = req.params.userId
            res.status(200).json(await deleteUser(userId))
        } catch (err) {
            next(err)
        }
    })
}