const uri = require('./dbUri');
const connectToDb = require('./connectToDb');

const connection = {
  uri,
  status: connectToDb(uri),
};

const collections = {
  product: 'Product',
  user: 'User',
  category: 'Category',
  order: 'Order',
};

module.exports = {
  connection,
  collections,
};
