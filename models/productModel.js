let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    category: String,
    dateCreated: { type: Date, default: Date.now() },
})

productSchema.static('getProductCategories', async function () {
    return await this.find({}).select('category').distinct('category')
})

productSchema.static('getTotalPriceOfProducts', async function (productIds) {
    let totalPrice = 0;
    for (let i = 0; i < productIds.length; i++) {
        let product = await this.findById(productIds[i]);
        totalPrice += product.productPrice;
    }
    return totalPrice;
})

module.exports = mongoose.model('products', productSchema)