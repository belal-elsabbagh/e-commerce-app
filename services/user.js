const { userModel } = require('../models')
const { NotFoundError, InvalidDuplicateEntryError, NotAuthenticatedError } = require('../errors')
const { MongoDuplicateKeyError } = require('../config/constants').STATUS_CODES

/**
 * 
 */
class UserServices {
    constructor(model) {
        this.userModel = model
    }

    /**
     * 
     * @param {Object} userObject The user object to add to the database
     * @returns {Object} The data of the user that was created
     */
    addUser = async (userObject) => {
        try {
            return await userModel.create(userObject)
        } catch (err) {
            if (err.code === MongoDuplicateKeyError) throw new InvalidDuplicateEntryError('Email already exists')
            throw err
        }
    }

    /**
     * 
     * @param {Object} userObject The user object to add to the database
     * @returns {(Object|Boolean)} The data of the user that was created
     */
    runLoginQuery = async (userObject) => {
        let queryResult = await this.userModel.findOne(userObject)
        if (queryResult === null) return false;
        return queryResult
    }

    userIdExists = async (userId) => {
        let queryResult = await this.userModel.findById(userId)
        if (!queryResult) return false;
        return true;
    }

    getUserById = async (userId) => {
        let queryResult = await this.userModel.findById(userId)
        if (!queryResult) throw new NotFoundError(`User with id \'${id}\' was not found`);
        return queryResult;
    }

    /**
     * 
     * @param {string} email The user's email to search for
     * @throws {NotFoundError} If the user is not found
     * @returns The user's data 
     */
    getUserByEmail = async (email) => {
        let queryResult = await this.userModel.findOne({ email: email })
        if (queryResult === null) throw new NotFoundError(`User with email \'${email}\' was not found`);
        return queryResult;
    }

    userEmailExists = async (email) => {
        let queryResult = await this.userModel.findOne({ email: email })
        if (!queryResult) return false;
        return true
    }

    getUsers = async (filter = {}) => {
        return await userModel.find(filter)
    }

    getLoginResult = async (user) => {
        try {
            let result = await this.runLoginQuery(user);
            if (result === false) throw new NotAuthenticatedError('Incorrect Credentials to login');
            return result;
        } catch (err) {
            throw err
        }
    }

    deleteUser = async (userId) => {
        try {
            await this.getUserById(userId)
            return await this.userModel.findByIdAndDelete(userId)
        } catch (err) {
            throw err
        }
    }

    login = async (user) => {
        try {
            const loggedInUser = await this.getLoginResult(user);
            const token = this.userModel.generateToken(loggedInUser)
            return {
                token: token,
                user: loggedInUser
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = new UserServices(userModel);