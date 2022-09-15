const toObjectId = require('./toObjectId')
const {NotFoundError} = require('../errors');
module.exports = async (model, id) => {
    if ((await model.findById(id)) === null) throw new NotFoundError('This id was not found in the collection', {id})
    return toObjectId(id)
}
