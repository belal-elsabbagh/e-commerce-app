const {InternalServerError, NotFoundError} = require("../errors");
const {categoryModel} = require("../models");

class Category {
    constructor() {
        this.categoryModel = categoryModel;
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
            if (category === null) throw new NotFoundError("No category was found having this id")
            return category
        } catch (err) {
            throw err
        }

    }

    getCategories = async (filter = {}) => {
        let category = undefined
        try {
            category = await this.categoryModel.find(filter)
            if (category === null) throw new NotFoundError("No category was found having these parameters")
            return category
        } catch (err) {
            throw err
        }
    }

    updateCategory = async (categoryId, updates) => {
        try {
            await this.getCategoryById(categoryId);
            return await this.categoryModel.findByIdAndUpdate(categoryId, updates, {new: true})
        } catch (err) {
            throw err
        }
    }

    deleteCategory = async (categoryId) => {
        try {
            await this.getCategoryById(categoryId);
            return await this.categoryModel.findByIdAndDelete(categoryId)
        } catch (err) {
            throw err
        }
    }
}

module.exports = new Category();