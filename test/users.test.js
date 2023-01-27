const { describe, it, expect } = require('@jest/globals');
const {
  constants: { STATUS_CODES },
} = require('../config');
const {
  validate,
  validationSchemas: {
    userSchemas: { signupSchema },
  },
} = require('../validation');
const verifyUserToken = require('../middleware/verifyUserToken');
const {
  userServices: { addUser, deleteUser, getUsers, login },
} = require('../services');

describe('Users Services Test', () => {
  const testUserData = {
    validSignupData: {
      username: 'testName',
      email: 'testEmail@gmail.com',
      password: 'testPassword',
    },

    badEmailSignupData: {
      username: 'testName',
      email: 'notAnEmail',
      password: 'testPassword',
    },

    badSignupData: {
      username: 'testName',
      email: 'notAnEmail',
      password: 'it',
    },

    badPasswordSignupData: {
      username: 'testName',
      email: 'newBelal@gmail.com',
      password: 'it',
    },

    invalidLoginData: {
      email: 'notWorking@fake.com',
      password: 'notWorking',
    },
  };
  describe('Bad Signup Data Detection', () => {
    it('bad email format error is detected', async () => {
      try {
        const validationResult = await validate(signupSchema, testUserData.badEmailSignupData);
        expect(validationResult.email).toEqual(null);
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.ValidationError);
        expect(err.details[0].message).toMatch(/email/);
      }
    });

    it('bad password format error is detected', async () => {
      try {
        const validationResult = await validate(signupSchema, testUserData.badPasswordSignupData);
        expect(validationResult.email).toEqual(null);
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.ValidationError);
        expect(err.details[0].message).toMatch(/password/);
      }
    });
  });
  describe('Successful signup', () => {
    let testUserResult = null;
    it('signup process is successful', async () => {
      try {
        testUserResult = await addUser(testUserData.validSignupData);
        expect(testUserResult.email).toEqual(testUserData.validSignupData.email);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });

    it('duplicate signup error is detected', async () => {
      try {
        const res = await addUser(testUserData.validSignupData);
        expect(res).toBeUndefined();
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.InvalidDuplicateEntry);
      }
    });

    it('delete user is successful', async () => {
      const res = await deleteUser(testUserResult._id.toString());
      expect(res.email).toEqual(testUserResult.email);
    });
  });
  describe('getting users', () => {
    it('get users is successful', async () => {
      try {
        const res = await getUsers();
        expect(res).toBeDefined();
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });

  describe('login process', () => {
    const loginData = {
      email: 'admin@gmail.com',
      password: '12345678',
    };

    it('incorrect login credentials error is detected', async () => {
      try {
        const res = await login(testUserData.invalidLoginData);
        expect(res).toBeUndefined();
      } catch (err) {
        expect(err.code).toEqual(STATUS_CODES.NotAuthenticated);
      }
    });

    it('login gives a verified token', async () => {
      try {
        const res = await login(loginData);
        const check = await verifyUserToken(res);
        expect(check.user.email).toEqual(loginData.email);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
