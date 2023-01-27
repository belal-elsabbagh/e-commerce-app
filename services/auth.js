const {userService} = require('./user')
const {NotAuthenticatedError} = require('../errors')

class AuthServices {
    /**
     *
     * @param {Object} userObject The user object to add to the database
     * @throws {NotAuthenticatedError} if the query doesn't find a user with these credentials
     * @returns {Object} The data of the user that was created
     */
    async _runLoginQuery(userObject) {
      try {
        let queryResult = await userService.get(userObject)
        return queryResult;
      } catch(err) {
        if (err.code === 404) throw new NotAuthenticatedError('Incorrect Credentials to login');
      }
    }

    async login(userCredentials) {
        const user = await this._runLoginQuery(userCredentials);
        const token = this.model.generateToken(user)
        return {token, user}
    }
}

module.exports = new AuthServices()
