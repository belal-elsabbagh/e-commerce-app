const { userModel } = require('../models')
const { InvalidDuplicateEntryError, NotAuthenticatedError } = require('../errors')
const BaseService = require("./BaseService");
const { MongoDuplicateKeyError } = require('../config/constants').STATUS_CODES

class UserServices extends BaseService {
    constructor() {
        super(userModel);
    }

    async add(userObject) {
        try {
            return await super.add(userObject)
        } catch (err) {
            if (err.code === MongoDuplicateKeyError) throw new InvalidDuplicateEntryError('Email already exists')
            throw err
        }
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

    async getLoginResult(user) {
        try {
            return await this.runLoginQuery(user);
        } catch (err) {
            throw err
        }
    }

    async login(userCredentials) {
        try {
            const user = await this.getLoginResult(userCredentials);
            const token = this.model.generateToken(user)
            return { token, user }
        } catch (err) {
            throw err
        }
    }
}

module.exports = new UserServices();