let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'luka';
    let lat = 1;
    let lng = 2;

    let genLocMessage = generateLocationMessage(from, lat, lng);
    expect(genLocMessage.from).toBe(from);
    expect(genLocMessage.url).toBe(`http://www.google.com/maps?q=${lat},${lng}`);
    expect(typeof genLocMessage.createdAt).toBe('number');
  });
});