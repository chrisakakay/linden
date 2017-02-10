'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');
jest.mock('../lib/test-runner');

const cmdInit = require('../lib/command-init');

global.console.log = jest.fn();

describe('CMD: init', () => {
    beforeEach(() => {
        console.log.mock.calls = [];
    });

    it('should create config', () => {
        let result = cmdInit('not-existing-file');

        expect(result).toBe(true);
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should not create config', () => {
        let result = cmdInit('existing-file');

        expect(result).toBe(false);
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should handle fs error', function() {
        let result = cmdInit('file-with-error');

        expect(result).toBe(false);
        expect(console.log).toHaveBeenCalledWith('File error');
    });
});

