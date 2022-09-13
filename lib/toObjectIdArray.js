const mongoose = require('mongoose')
const toObjectId = require('./toObjectId')
/**
 *
 * @param {Array.<String>} ids
 * @returns {Array.<mongoose.Schema.Types.ObjectId>}
 */
module.exports = (ids) => {
    if (ids.constructor === Array) return ids.map(mongoose.Types.ObjectId);
    return [toObjectId(ids)];
}