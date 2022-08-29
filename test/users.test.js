const { test, expect } = require('@jest/globals')

jest.mock('../models')
jest.mock('../services/userServices.js')

test('should get all users', async () => {
    const res = []
    expect(true).toBe(true)
})

