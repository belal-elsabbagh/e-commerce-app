const {NotFoundError, InternalServerError} = require('../errors');
const {productModel} = require('../models');

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
        let queryResult = undefined
        try {
            queryResult = await this.productModel.find(filter);
        } catch (err) {
            throw new InternalServerError('Failed to run query to get product by id \'${id}\'.')
        }
        if (queryResult === null) throw new NotFoundError("No product was found having these parameters")
        return queryResult
    }

    getProductById = async (productId) => {
        let queryResult = undefined
        try {
            queryResult = await this.productModel.findById(productId)
        } catch (err) {
            throw new InternalServerError(`Failed to run query to get product by id \'${productId}\'.`)
        }
        if (queryResult === null) throw new NotFoundError(`Product with id \'${productId}\' was not found.`);
        return queryResult;
    }

    updateProduct = async (productId, updates) => {
        try {
            await this.getProductById(productId)
            return await this.productModel.findByIdAndUpdate(productId, updates, {new: true})
        } catch (err) {
            throw err
        }
    }

    deleteProduct = async (productId) => {
        try {
            await this.getProductById(productId)
            return await this.productModel.findByIdAndDelete(productId)
        } catch (err) {
            throw err
        }
    }
}

module.exports = new ProductServices(productModel);