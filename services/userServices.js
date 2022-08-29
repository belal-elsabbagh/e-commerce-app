const { userModel } = require('../models')
const { NotFoundError, InvalidDuplicateEntryError, NotAuthenticatedError } = require('../middleware/errors')
const MONGODB_DUPLICATE_KEY_ERR_CODE = 11000
class UserServices {
    /**
     * 
     * @param {Object} userObject The user object to add to the database
     * @returns {Object} The data of the user that was created
     */
    addUser = async (userObject) => {
        try {
            return await userModel.create(userObject)
        } catch (err) {
            if (err.code === MONGODB_DUPLICATE_KEY_ERR_CODE) throw new InvalidDuplicateEntryError('Email already exists')
            throw err
        }
    }

    /**
     * 
     * @param {Object} userObject The user object to add to the database
     * @returns {(Object|Boolean)} The data of the user that was created
     */
    runLoginQuery = async (userObject) => {
        let queryResult = await userModel.findOne(userObject)
        if (queryResult === null) return false;
        return queryResult
    }

    userIdExists = async (userId) => {
        let queryResult = await userModel.findById(userId)
        if (queryResult === null) return false;
        return true;
    }

    getUserById = async (userId) => {
        let queryResult = await userModel.findById(userId)
        if (queryResult === null) throw new NotFoundError(`User with id \'${id}\' was not found`);
        return queryResult;
    }

    /**
     * 
     * @param {string} email The user's email to search for
     * @throws {NotFoundError} If the user is not found
     * @returns 
     */
    getUserByEmail = async (email) => {
        let queryResult = await userModel.findOne({ email: email })
        if (queryResult === null) throw new NotFoundError(`User with email \'${email}\' was not found`);
        return queryResult;
    }

    userEmailExists = async (email) => {
        let queryResult = await userModel.findOne({ email: email })
        if (queryResult === null) return false;
        return true
    }

    getUsers = async () => {
        return await userModel.find({})
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
            return await userModel.findByIdAndDelete(userId)
        } catch (err) {
            throw err
        }
    }

    login = async (user) => {
        try {
            let loggedInUser = await this.getLoginResult(user);
            return userModel.generateToken(loggedInUser)
        } catch (err) {
            throw err
        }
    }
}

module.exports = new UserServices();