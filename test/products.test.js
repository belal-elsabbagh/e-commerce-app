const { describe, it, expect, afterAll, beforeAll } = require('@jest/globals');
const {
  constants: { STATUS_CODES },
} = require('../config');
const {
  validate,
  validationSchemas: { productSchema },
} = require('../validation');
const {
  productServices: { addProduct, deleteProduct, getProducts, getProductById, updateProduct },
} = require('../services');
describe('Products Services Test', () => {
  let testProductId = null;
  const validProductData = {
    productName: 'new product',
    productPrice: 1123.456,
    category: 'new category',
  };

  it('get products', async () => {
    const res = await getProducts();
    expect(Array.isArray(res)).toBe(true);
  });

  describe('Bad Product Data Detection', () => {
    const productData = {
      productName: 'new product',
      productPrice: 'string',
      categoryId: '6315d80df6c2127808dd84e6',
    };

    it('detected that price is a string', async () => {
      try {
        const validationResult = await validate(productSchema, productData);
        expect(validationResult.email).toEqual(null);
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.ValidationError);
        expect(err.details[0].message).toMatch(/productPrice/);
      }
    });
  });

  describe('adding a product', () => {
    it('product was added successfully', async () => {
      try {
        const res = await addProduct(validProductData);
        expect(res.productPrice).toEqual(validProductData.productPrice);
        expect(res.productName).toEqual(validProductData.productName);
        testProductId = res._id;
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });

    afterAll(async () => {
      await deleteProduct(testProductId.toString());
    });
  });

  describe('operations on products', () => {
    beforeAll(async () => {
      const res = await addProduct(validProductData);
      testProductId = res._id;
    });

    it('get product by id', async () => {
      const res = await getProductById(testProductId.toString());
      expect(res.task).toEqual(testProductId.task);
    });

    it('not found product', async () => {
      const fakeId = '632056609e36a48577c63bda';
      try {
        const res = await getProductById(fakeId);
        expect(res).toBe(undefined);
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.NotFoundError);
      }
    });

    it('update productName', async () => {
      const updatedName = 'updated name';
      const res = await updateProduct(testProductId.toString(), {
        productName: updatedName,
      });
      expect(res.productName).toEqual(updatedName);
    });

    afterAll(async () => {
      await deleteProduct(testProductId.toString());
    });
  });
});
