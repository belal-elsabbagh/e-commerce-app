const {userModel} = require('../models')
const {NotAuthenticatedError, NotFoundError} = require('../errors')
const BaseService = require('../models/BaseService');
const orderServices = require('./order');

class UserServices extends BaseService {
    constructor() {
        super(userModel);
    }

    async getUserOrders(userId) {
        return orderServices.get({userId})
    }

    async getWithOrders(filter = {}) {
        let result = await super.get(filter);
        return Promise.all(result.map(async (user) => {
            let orders = null
            try {
                orders = await this.getUserOrders(user._id.toString())
            } catch (err) {
                if (!(err instanceof NotFoundError)) throw err
                orders = 'This user has no orders'
            }
            return {...(user._doc), orders}
        }))
    }

    /**
     *
     * @param {Object} userObject The user object to add to the database
     * @throws {NotAuthenticatedError} if the query doesn't find a user with these credentials
     * @returns {Object} The data of the user that was created
     */
    async runLoginQuery(userObject) {
        let queryResult = await this.model.findOne(userObject)
        if (queryResult === null) throw new NotAuthenticatedError('Incorrect Credentials to login');
        return queryResult
    }

    async login(userCredentials) {
        const user = await this.runLoginQuery(userCredentials);
        const token = this.model.generateToken(user)
        return {token, user}
    }
}

module.exports = new UserServices();
