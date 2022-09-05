const mongoose = require('mongoose')
const categoryModel = new mongoose.Schema({
    categoryTitle: String,
    dateCreated: { type: Date, default: Date.now() }
})
module.exports = mongoose.model('categories', categoryModel)