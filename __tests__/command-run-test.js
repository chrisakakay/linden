'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');
jest.mock('../lib/test-runner');

const cmdRun        = require('../lib/command-run');
const testRunner    = require.requireMock('../lib/test-runner');

global.console.log = jest.fn();

describe('CMD: run', () => {
    beforeEach(() => {
        console.log.mock.calls      = [];
        testRunner.init.mock.calls  = [];
    });

    it('should not run without a filename', () => {
        expect(cmdRun()).toBe(false);
    });

    it('should not run without existing config', () => {
        cmdRun('not-existing-config');

        expect(console.log).toHaveBeenCalledWith('Configuration not found:', 'not-existing-config');
        expect(testRunner.init).not.toHaveBeenCalled();
    });

    it('should run with existing config', () => {
        cmdRun('existing-config');

        expect(console.log).not.toHaveBeenCalledWith('Configuration not found:', 'existing-config');
        expect(testRunner.init).toHaveBeenCalledWith({ cases: [] });
    });

    // add more run tests
});
