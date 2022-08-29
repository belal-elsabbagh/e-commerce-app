const { validate } = require('../validation')
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
            res.status(201).json();
        }
        catch (err) {
            next(err)
        }
    });
}