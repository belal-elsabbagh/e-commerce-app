const {describe, it, expect, afterAll, beforeAll} = require('@jest/globals');
const {STATUS_CODES} = require('../config/constants');
const {validate, validationSchemas: {orderSchema}} = require('../validation')
const {orderServices: {addOrder}} = require('../services')

describe('Order tests', function () {
    describe('add order', function () {
        let result = undefined;
        const validOrderData = {
            userId: '631369fe76940294e8b66a5b',
            productIds: [
                '630cdca8544c08c5b51f9b9e',
                '6317aa3f3d85fcf36d29bf63'
            ],
            shippingAddress: "123 Main st.",
            phoneNumber: "01066828338"
        }
        beforeAll(async () => {
            result = await addOrder(validOrderData)
        })

        it('total price was calculated correctly', async () => {
            expect(result.totalPrice).toEqual(2000)
        })

        it('status is pending', async () => {
            expect(result.status).toEqual("pending")
        })
    });
});