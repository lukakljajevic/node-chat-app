const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString validation', () => {
  it('should reject non-string values', () => {
    let test = 123;
    let result = isRealString(test);
    expect(result).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    let test = '   ';
    let result = isRealString(test);
    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let test = '   abc   ';
    let result = isRealString(test);
    expect(result).toBe(true);
  });
});