const mongoose = require('mongoose')
module.exports = (id) => {
    return new mongoose.Types.ObjectId(id);
}