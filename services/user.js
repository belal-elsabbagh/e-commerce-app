const {userModel} = require('../models')
const {InvalidDuplicateEntryError, NotAuthenticatedError} = require('../errors')
const BaseService = require("./BaseService");
const {MongoDuplicateKeyError} = require('../config/constants').STATUS_CODES

class UserServices extends BaseService {
    constructor() {
        super(userModel);
    }

    /**
     * @override The method will throw an exception if the new user's email already exists
     * @param userObject
     * @throws {InvalidDuplicateEntryError}
     * @returns {Promise<*|undefined>}
     */
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

    async login(userCredentials) {
        const user = await this.runLoginQuery(userCredentials);
        const token = this.model.generateToken(user)
        return {token, user}
    }
}

module.exports = new UserServices();