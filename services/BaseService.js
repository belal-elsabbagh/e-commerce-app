const {InternalServerError, NotFoundError} = require("../errors");

module.exports = class BaseService {
    constructor(model) {
        this.model = model
    }

    /**
     * @throws {InternalServerError}
     * @param {Object} object
     * @returns {Promise<*>}
     */
    async add(object) {
        try {
            return await this.model.create(object);
        } catch (err) {
            throw new InternalServerError("Failed to run query to create object")
        }
    }

    /**
     * @throws {NotFoundError}
     * @param {Object} filter
     * @returns {Promise<*>}
     */
    async get(filter = {}) {
        let object = await this.model.find(filter)
        if (object.length === 0) throw new NotFoundError(`Nothing was found having this data`, filter)
        return object
    }

    /**
     * @throws {NotFoundError}
     * @param {String} id
     * @returns {Promise<*>}
     */
    async getById(id) {
        let object = await this.model.findById(id)
        if (!object) throw new NotFoundError(`Nothing was found with this id.`, {id})
        return object
    }

    /**
     * @throws {NotFoundError}
     * @param id
     * @param updates
     * @returns {Promise<*>}
     */
    async update(id, updates) {
        await this.getById(id);
        return await this.model.findByIdAndUpdate(id, updates, {new: true})
    }

    /**
     * @throws {NotFoundError}
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        await this.getById(id);
        return await this.model.findByIdAndDelete(id)
    }
}