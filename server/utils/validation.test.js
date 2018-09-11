const expect = require('expect');

const { isRealString } = require('./validation');


describe('isRealString Tests', () => {
  it('should reject non string values', () => {

    let testString = 9;
    let validString = isRealString(testString);
    expect(validString).toBe(false);

  });

  it('should reject string with only spaces', () => {

    let testString = '      ';
    let validString = isRealString(testString);
    expect(validString).toBe(false);

  });

  it('should allow string with non-space characters', () => {

    let testString = 'test';
    let validString = isRealString(testString);
    expect(validString).toBe(true);

  });


});
