let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let example = {
      from: 'Luka',
      text: 'Hello test'
    };

    let genMessage = generateMessage(example.from, example.text);
    // expect(genMessage.from).toBe(example.from);
    // expect(genMessage.text).toBe(example.text);
    expect(genMessage).toMatchObject(example);
    expect(typeof genMessage.createdAt).toBe('number');
  });
});