const expect = require('expect');

const { generateMessage } = require('./message');

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