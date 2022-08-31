const { NotFoundError, InternalServerError } = require('../middleware/errors');
const { productModel } = require('../models');

class ProductServices {
    constructor(model) {
        this.productModel = model;
    }

    addProduct = async (productObject) => {
        try {
            return await this.productModel.create(productObject);
        } catch (err) {
            throw err;
        }
    }

    getProductCategories = async () => {
        try {
            return await this.productModel.getProductCategories();
        } catch (err) {
            throw err;
        }
    }

    getProducts = async (filter = {}) => {
        try {
            return await this.productModel.find(filter);
        } catch (err) {
            throw err;
        }
    }

    getProductById = async (productId) => {
        try {
            let queryResult = await this.productModel.findById(productId)
            if (queryResult === null) throw new NotFoundError(`Product with id \'${id}\' was not found.`);
            return queryResult;
        } catch (err) {
            if (!(err instanceof NotFoundError)) throw new InternalServerError('Failed to get product by id \'${id}\'.')
            throw err
        }
    }

    updateProduct = async (productId, updates) => {
        try {
            this.getProductById(productId)
            return await this.productModel.findByIdAndUpdate(productId, updates)
        } catch (err) {
            throw err
        }
    }
}

module.exports = new ProductServices(productModel);