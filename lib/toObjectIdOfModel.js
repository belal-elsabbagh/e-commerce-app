import mongoose from "mongoose";

/**
 *
 * @param {Array.<string>} ids
 * @returns {Array.<mongoose.Schema.Types.ObjectId>}
 */
module.exports = (id) => {
    return mongoose.Types.ObjectId(id);
}