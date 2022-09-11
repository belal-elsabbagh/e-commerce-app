module.exports = {
    server: {
        port: 3000,
        host: '127.0.0.1'
    },
    database: require('./database'),
    jwtSecretKey: '3.1415926535',
}