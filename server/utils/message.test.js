var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate the correct message object',() => {
        var result = generateMessage('Parker','Test');
        expect(result.from).toBe('Parker');
        expect(result.text).toBe('Test');
        expect(typeof result.createdAt).toBe('number');
    });
});

describe('generateLocationMessage',() => {
    it('should generate the correct location message object',() => {
        var result = generateLocationMessage('Parker',1,1);
        expect(result.from).toBe('Parker');
        expect(result.url).toBe('https://google.com/maps?q=1,1');
        expect(typeof result.createdAt).toBe('number');
    });
});