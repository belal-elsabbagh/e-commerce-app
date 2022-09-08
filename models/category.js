const mongoose = require('mongoose')
const {database} = require("../config");
const categorySchema = new mongoose.Schema({
    name: String
}, { timestamps: true })

module.exports.schema = categorySchema
module.exports.model = mongoose.model(database.collections.category, categorySchema)