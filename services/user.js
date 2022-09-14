const {userModel} = require('../models')
const {NotAuthenticatedError, NotFoundError} = require('../errors')
const BaseService = require('../models/BaseService');
const orderServices = require('./order');
const {database} = require("../config");

class UserServices extends BaseService {
    constructor() {
        super(userModel);
    }

    async getUserOrders(userId) {
        return orderServices.get({userId})
    }

    async getUsersWithOrders(filter = {}) {
        return this.model.aggregate([
            {
                '$lookup': {
                    'from': database.collections.order,
                    'localField': '_id',
                    'foreignField': 'userId',
                    'as': 'orders'
                }
            }
        ])
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
