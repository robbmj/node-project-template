'use strict';

var test = require('../build/node/demo').asyncTest;

describe('Basic Test Async Test', function () {
    it('Should Return 2 Messages', function (done) {
        test().then(function (messages) {
            expect(messages.length).toBe(2);
            done();
        });
    });
});
