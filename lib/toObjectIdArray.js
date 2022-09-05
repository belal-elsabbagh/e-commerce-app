import mongoose from "mongoose";

/**
 *
 * @param {Array.<string>} ids
 * @returns {Array.<mongoose.Schema.Types.ObjectId>}
 */
module.exports = (ids) => {
    if (ids.constructor === Array) return ids.map(mongoose.Types.ObjectId);
    return [mongoose.Types.ObjectId(ids)];
}