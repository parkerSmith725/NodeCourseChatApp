var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',() => {
    it('should reject non string values',() => {
        var test = 1;
        var result = isRealString(test);
        expect(result).toBeFalsy();
    });

    it('should reject string with only spaces',() => {
        var test = '     ';
        var result = isRealString(test);
        expect(result).toBeFalsy();
    });

    it('should allow string with non-space characters',() => {
        var test = 'a';
        var result = isRealString(test);
        expect(result).toBeTruthy();
    });
});