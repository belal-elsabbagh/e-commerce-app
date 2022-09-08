const {categoryModel} = require("../models");
const BaseService = require("./BaseService");

class CategoryServices extends BaseService {
    constructor() {
        super(categoryModel)
    }
}

module.exports = new CategoryServices();