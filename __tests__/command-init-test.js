'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');
jest.mock('linden-fs-helper');

const cmdInit   = require('../lib/command-init');
const helper    = require.requireMock('linden-fs-helper');

global.console.log = jest.fn();

describe('CMD: init', () => {
    beforeEach(() => {
        console.log.mock.calls = [];
    });

    it('should create config', () => {
        helper.fileExists.mockReturnValueOnce(false);

        let result = cmdInit('not-existing-file');

        expect(result).toBe(true);
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should not create config', () => {
        helper.fileExists.mockReturnValueOnce(true);

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

