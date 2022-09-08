const {InternalServerError, NotFoundError} = require("../errors");

module.exports = class BaseService {
    constructor(model) {
        this.model = model
    }

    async add(object) {
        try {
            return await this.model.create(object);
        } catch (err) {
            throw new InternalServerError("Failed to run query to create object")
        }
    }

    async get(filter) {
        let object = await this.model.find(filter)
        if (object === null) throw new NotFoundError(`No object was found having ${filter}`)
        return object
    }

    async getById(id) {
        let object = await this.model.findById(id)
        if (object === null) throw new NotFoundError(`No object was found with id \'${id}\'`)
        return object
    }

    async update(id, updates) {
        try {
            await this.getById(id);
            return await this.model.findByIdAndUpdate(id, updates, {new: true})
        } catch (err) {
            throw err
        }
    }

    async delete(id) {
        try {
            await this.getById(id);
            return await this.model.findByIdAndDelete(id)
        } catch (err) {
            throw err
        }
    }
}