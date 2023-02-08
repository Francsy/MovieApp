const { validatePassword } = require('./regex')

require('./regex')
// This password test must return false because password is not safe enough
it('Testing to see if password regex works when the password is not good', () => {
    expect(validatePassword("1234")).toBe(false)
})
// This password test must return true because the password is safe enough
it('Testing to see if password regex works when the password is good', () => {
    expect(validatePassword("fT5?fslT%c")).toBe(true)
})