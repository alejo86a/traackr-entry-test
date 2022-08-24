const {
    insertIn,
    isValidFullName,
    countBy,
    orderBy,
    getStep1,
    getStep2
} = require('./index');
const assert = require('assert');

describe('insertIn', () => {    
    it('should return 1 if the key is not in the array', () => {
        const arr = {};
        const key = 'a';
        const value = insertIn(arr, key);
        assert.equal(value, 1);
    }),
    it('should return 2 if the key is in the array', () => {
        const arr = {a: 1};
        const key = 'a';
        const value = insertIn(arr, key);
        assert.equal(value, 2);
    }),
    it('should return 3 if the key is in the array with a value = 2', () => {
        const arr = {a: 2};
        const key = 'a';
        const value = insertIn(arr, key);
        assert.equal(value, 3);
    }),
    it('should return 3 if the key is in the array with a value = 2', () => {
        const arr = {a: 1, b: 2};
        const key = 'b';
        const value = insertIn(arr, key);
        assert.equal(value, 3);
    })
});

describe('isValidFullName', () => {
    it('should return false if the name is not valid', () => {
        const nameSplited = ['alejandro', 'berrio'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, false);
    }),
    it('should return true if the name is not valid', () => {
        const nameSplited = ['a123', 'b'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, true);
    }),
    it('should return true if the lastname is not valid', () => {
        const nameSplited = ['a123', 'b'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, true);
    }),
    it('should return false if the name has Upper letters', () => {
        const nameSplited = ['Alejandro', 'berrio'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, false);
    }),
    it('should return false if the name has Upper letters', () => {
        const nameSplited = ['alejandro', 'Berrio'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, false);
    }),
    it('should return false if the name and lastname has Upper letters', () => {
        const nameSplited = ['Alejandro', 'Berrio'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, false);
    }),
    it('should return true if the name is not valid by special characteres', () => {
        const nameSplited = ['alejandro', 'berrio%^'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, true);
    }),
    it('should return true if the lastname is not valid by special characteres', () => {
        const nameSplited = ['alejandro^&%', 'berrio'];
        const result = isValidFullName(nameSplited);
        assert.equal(result, true);
    })
});

describe('countBy', () => {
    it('should return [] if the array is empty', () => {
        const arr = {};
        const result = countBy(arr);
        assert.equal(result, 0);
    }),
    it('should return 1 if the array has one element', () => {
        const arr = {a: 1};
        const result = countBy(arr);
        assert.equal(result, 1);
    }),
    it('should return 7 if the array has seven elements', () => {
        const arr = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7};
        const result = countBy(arr);
        assert.equal(result, 7);
    })
});

describe('orderBy', () => {
    it('should return [] if the array is empty', () => {
        const arr = {};
        const result = orderBy(arr);
        assert.deepEqual(result, []);
    }),
    it('should return ordered array if the array has four elements with wrong order', () => {
        const arr = {a: 1, b: 2, c: 3, d: 4};
        const result = orderBy(arr);
        const expected = ['d with 4', 'c with 3', 'b with 2', 'a with 1'];
        assert.deepEqual(result, expected);
    }),
    it('should return ordered array if the array has four elements even with the rigth order', () => {
        const arr = {a: 4, b: 3, c: 2, d: 1};
        const result = orderBy(arr);
        const expected = ['a with 4', 'b with 3', 'c with 2', 'd with 1'];
        assert.deepEqual(result, expected);
    })
});

describe('getStep1', () => {
    it('should validate given example', () => {
        const arr = ['Smith, Joan', 'Smith, John', 'Smith, Sam', 'Thomas, Joan', 'Upton, Joan', 'Upton, Tom', 'Vasquez, Cesar'];
        const expected = [{name: 'Joan', lastName: 'Smith'},{name: 'Tom', lastName: 'Upton'},{name: 'Cesar', lastName: 'Vasquez'}];
        const result = getStep1(arr);
        assert.deepEqual(result, expected);
    })
});

describe('getStep2', () => {
    it('should validate given example', () => {
        const arr = [{name: 'Carl', lastName: 'Brutananadilewski'},{name: 'Xander', lastName: 'Crews'},{name: 'Eric', lastName: 'Cartman'}];
        const expected = [{name: 'Xander', lastName: 'Brutananadilewski'},{name: 'Eric', lastName: 'Crews'},{name: 'Carl', lastName: 'Cartman'}];
        const result = getStep2(arr);
        assert.deepEqual(result, expected);
    })
    it('should validate given false example', () => {
        const arr = [{name: 'Carl', lastName: 'Brutananadilewski'},{name: 'Xander', lastName: 'Crews'},{name: 'Eric', lastName: 'Cartman'}];
        const expected = [{name: 'Fred', lastName: 'Brutananadilewski'},{name: 'Barney', lastName: 'Crews'},{name: 'Bambam', lastName: 'Cartman'}];
        const result = getStep2(arr);
        assert.notDeepEqual(result, expected);
    })
});