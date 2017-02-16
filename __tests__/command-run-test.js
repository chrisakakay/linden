'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');
jest.mock('linden-fs-helper');
jest.mock('linden-configuration-parser');
jest.mock('linden-task-runner');

const cmdRun = require('../lib/command-run');
const helper = require.requireMock('linden-fs-helper');

global.console.log = jest.fn();

describe('CMD: run', () => {
    beforeEach(() => {
        console.log.mock.calls = [];
    });

    it('should not run without a filename', () => {
        expect(cmdRun()).toBe(false);
    });

    it('should not run without existing config', () => {
        helper.fileExists.mockReturnValueOnce(false);

        cmdRun('not-existing-config');

        expect(console.log).toHaveBeenCalledWith('Configuration not found:', 'not-existing-config');
    });

    it('should run with existing config', () => {
        helper.fileExists.mockReturnValueOnce(true);

        cmdRun('existing-config');

        expect(console.log).not.toHaveBeenCalledWith('Configuration not found:', 'existing-config');
    });
});

