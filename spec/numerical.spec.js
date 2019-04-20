const controller = require('../controllers.js')


describe('Testing numerical conversions', () => {
  it('Testing error case: False roman input ', () => {
    const message = controller.romanToArab('/roman/ABC');
    expect(message).toBe(getErrorMessage('Not a valid roman number'));
  })
  it('Testing error case: False arabic input', () => {
    const message = controller.arabToRoman('/arabic/ABC');
    expect(message).toBe(getErrorMessage('Not a valid arabic number'));
  })
  it('Testing case: Correct arabic number', () => {
    const message = controller.arabToRoman('/arabic/12');
    expect(message).toBe(getErrorMessage('{ inputValue: 12, convertedValue: XII }'));
  })
  it('Testing case: Correct roman number', () => {
    const message = controller.romanToArab('/roman/XII');
    expect(message).toBe(getErrorMessage('{ inputValue: XII, convertedValue: 12 }'));
  })
})
