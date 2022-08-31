const { test, expect } = require('@jest/globals')

jest.mock('../models')
jest.mock('../services/userServices.js')

test('nothing', async () => {
    expect(true).toBe(true)
})

