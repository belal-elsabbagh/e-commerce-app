const {orderServices: {addOrder}} = require('./services');
const validOrderData = {
    userId: '631369fe76940294e8b66a5b',
    productIds: [
        '630cdca8544c08c5b51f9b9e',
        '6317aa3f3d85fcf36d29bf63'
    ],
    shippingAddress: "123 Main st.",
    phoneNumber: "01066828338"
}

addOrder(validOrderData).then(result => console.log(result))