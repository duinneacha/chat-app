const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {


    const from = 'Mocha';
    const text = 'Test message from Mocha';


    const testReturnedMessage = generateMessage(from, text);

    expect(testReturnedMessage.from).toBe(from);
    expect(testReturnedMessage.text).toBe(text);

    // Another way for the two above - toMatchObject looks to see that testReturnedMessage contains the items from and text
    expect(testReturnedMessage).toMatchObject({ from, text });

    expect(typeof testReturnedMessage.createdAt).toBe('number');


  });
});


describe('generateLocationMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Mocha';

    const latitude = '51.9077888';
    const longitude = '-8.2706432';
    const glmReturnData = generateLocationMessage(from, latitude, longitude);

    expect(glmReturnData.from).toBe(from);
    expect(glmReturnData.url).toBe('https://www.google.com/maps?q=51.9077888,-8.2706432');
    expect(typeof glmReturnData.createdAt).toBe('number');
  });

});