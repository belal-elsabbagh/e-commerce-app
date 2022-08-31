const { addOrder } = require("../services/orderServices");

async function main() {
    console.log(await addOrder({
        userId: '630e547946671b0ddf2116b4',
        productIds: ['630f25066e6ceaba2e92de77'],
        shippingAddress: '123 Main St',
        phoneNumber: '123-456-7890',
    }))
}

main()