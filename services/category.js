const { categoryModel } = require('../models');
const BaseService = require('../models/BaseService');

class CategoryServices extends BaseService {
  constructor() {
    super(categoryModel);
  }
}

module.exports = new CategoryServices();
