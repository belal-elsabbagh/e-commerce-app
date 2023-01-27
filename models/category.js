const mongoose = require('mongoose');
const { database } = require('../config');
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, index: { unique: true, dropDups: true } },
  },
  {
    collection: database.collections.category,
    timestamps: true,
  },
);

module.exports = {
  schema: categorySchema,
  model: mongoose.model(database.collections.category, categorySchema, database.collections.category),
};
