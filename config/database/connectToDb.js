const mongoose = require('mongoose')

module.exports = uri => {
    console.log('Connecting to database...')
    mongoose.connect(uri).then(() => {
        console.log(`Successfully connected to ${uri}`);
    })
    return true
}
