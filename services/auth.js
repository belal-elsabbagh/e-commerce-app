const { userService } = require('./user')
const { NotAuthenticatedError, InternalServerError } = require('../errors')

class AuthServices {
  /**
   *
   * @param {Object} userObject The user object to add to the database
   * @throws {NotAuthenticatedError} if the query doesn't find a user with these credentials
   * @returns {Object} The data of the user that was created
   */
  async _runLoginQuery(userObject) {
    try {
      return await userService.get(userObject);
    } catch (err) {
      if (err.code === 404) throw new NotAuthenticatedError('Incorrect Credentials to login');
      throw new InternalServerError("An unexpected error has occured while logging in.")
    }
  }

  async login(userCredentials) {
    return {
      token: this.model.generateToken(user),
      user: await this._runLoginQuery(userCredentials)
    }
  }
}

module.exports = new AuthServices()
