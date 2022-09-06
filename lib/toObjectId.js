const mongoose = require('mongoose')
/**
 *
 * @param {string} id
 * @returns {mongoose.Types.ObjectId}
 */
module.exports = (id) => {
    return new mongoose.Types.ObjectId(id);
}