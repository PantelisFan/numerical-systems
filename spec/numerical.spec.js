const controller = require('../src/controllers.js')

describe('Testing numerical conversions', () => {
  //Error cases
  it('Testing error case: Roman to Arabic invalid characters "QJO"', async () => {
    let message;
    try {
      message = await controller.romanToArab('QJO')
    } catch (error) {
      // expect(error).toBe(400)
      message = error;
    }
    expect(message).toBe(400);
  });


  it('Testing error case: Arabic to Roman invalid input "ABC"', async () => {
    let message;
    try {
      message = await controller.arabToRoman('ABC')
    } catch (error) {
      message = error
    }
    expect(message).toBe(400);
  })

  it('Testing error case: GET all with invalid parameter', async () => {
    let message;
    try {
      message = await controller.arabToRoman('/all/sumerian');

    } catch (error) {
      message = error
    }
    expect(message).toBe(400);
  })


  //Valid cases
  it('Testing case: Valid Roman characters to Arabic number "XII"', async () => {
    let message;
    try {
      message = await controller.romanToArab('XII')
    } catch (error) {
      message = error
    }
    expect(message.convertedValue).toBe(12)
  })
  it('Testing case: Valid Arabic number "12" to Roman Characters "XII"', async () => {
    let message;
    try {
      message = await controller.arabToRoman(12)
    } catch (error) {
      message = error
    }
    expect(message.convertedValue).toBe("XII")
  })
})