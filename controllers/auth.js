const {signupSchema, loginSchema} = require('../validation/').validationSchemas.userSchemas
const {
    STATUS_CODES
} = require('../config/constants');
const {auth} = require('../services')
module.exports = function(app) {
      app.post('/signup', async (req, res, next) => {
        try {
            let user = await validate(signupSchema, req.body);
            res.status(STATUS_CODES.Created).json(await auth.add(user));
        } catch (err) {
            next(err)
        }
    });

    app.post('/login', async (req, res, next) => {
        try {
            let user = await validate(loginSchema, req.body);
            res.status(STATUS_CODES.Success).json(await auth.login(user));
        } catch (err) {
            next(err)
        }
    })
}
