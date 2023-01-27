const { userModel } = require('../models');
const { NotAuthenticatedError } = require('../errors');
const BaseService = require('../models/BaseService');
const { database } = require('../config');

class UserServices extends BaseService {
  constructor() {
    super(userModel);
  }

  async getUsersWithOrders() {
    const getUsersWithOrdersQuery = [
      {
        $lookup: {
          from: database.collections.order,
          localField: '_id',
          foreignField: 'userId',
          as: 'orders',
        },
      },
    ];
    return this.model.aggregate(getUsersWithOrdersQuery);
  }
}

module.exports = new UserServices();
