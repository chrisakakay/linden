'use strict';

/* eslint-env jest */

const cli = require('../lib/cli');

describe('CLI', () => {
    it('should not run if args are not defined', function() {
        expect(cli()).toBe(false);
    });
});
