const { PAGINATION_DEFAULT_VALUES: {page, limit} } = require('../config/constants')

module.exports = async function(req, res, next) {
    try {
        if(!req.query.page) req.query.page = page
        if(!req.query.limit || req.query.limit < limit) req.query.limit = limit
        req.query.page = parseInt(req.query.page, 10)
        req.query.limit = parseInt(req.query.limit, 10)
        next()
    } catch (err) {
        next(err)
    }
}
