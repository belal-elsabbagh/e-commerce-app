const toObjectId = require('./toObjectId')
const {NotFoundError} = require('../errors');
module.exports = async (model, id) => {
    const findByIdResult = await model.findById(id)
    if (findByIdResult === null) throw new NotFoundError('This id was not found in the collection', {id})
    return toObjectId(id)
}
