const { productModel } = require('../models')

async function main() {
console.log(await productModel.getProductCategories())
}

main()