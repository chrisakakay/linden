'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');

const cmdRun = require('../lib/command-run');

global.console.log = jest.fn();

describe('CMD: run', () => {
    beforeEach(() => {
        console.log.mock.calls      = [];
    });

    it('should not run without a filename', () => {
        expect(cmdRun()).toBe(false);
    });

    it('should not run without existing config', () => {
        cmdRun('not-existing-config');

        expect(console.log).toHaveBeenCalledWith('Configuration not found:', 'not-existing-config');
    });

    it('should run with existing config', () => {
        cmdRun('existing-config');

        expect(console.log).not.toHaveBeenCalledWith('Configuration not found:', 'existing-config');
    });

    // add more run tests
});
