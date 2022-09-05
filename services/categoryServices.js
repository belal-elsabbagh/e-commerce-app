const {InternalServerError, NotFoundError} = require("../errors");
const {categoryModel} = require("../models");

class CategoryServices {
    constructor(model) {
        this.categoryModel = model;
    }

    addCategory = async (category) => {
        try {
            return await this.categoryModel.create(category);
        } catch (err) {
            throw new InternalServerError("Failed to run query to create category")
        }
    }

    getCategoryById = async (categoryId) => {
        let category = undefined
        try {
            category = await this.categoryModel.findById(categoryId)
        } catch (err) {
            throw new InternalServerError("Failed to run query to get category by id")
        }
        if (category === null) throw new NotFoundError("No category was found having this id")
        return category
    }

    getCategories = async (filter = {}) => {
        let category = undefined
        try {
            category = await this.categoryModel.find(filter)
        } catch (err) {
            throw new InternalServerError("Failed to run query to get categories")
        }
        if (category === null) throw new NotFoundError("No category was found having these parameters")
        return category
    }

    getCategoriesAsArray = async () => {
        try {
            return await this.categoryModel.find({}).select('category')
        } catch (err) {
            throw new InternalServerError("Failed to run query to get categories as array")
        }
    }
}

module.exports = new CategoryServices(categoryModel);