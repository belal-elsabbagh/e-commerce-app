const uri = require('./dbUri')
const connectToDb = require('./connectToDb')

module.exports = {
    connection: {
        uri,
        status: connectToDb(uri)
    },
    collections: {
        product: 'Product',
        user: 'User',
        category: 'Category',
        order: 'Order'
    }
}
