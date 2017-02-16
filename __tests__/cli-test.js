'use strict';

/* eslint-env jest */
jest.mock('linden-configuration-parser');
jest.mock('../lib/command-init');
jest.mock('../lib/command-run');

const cli       = require('../lib/cli');
const cmdInit   = require.requireMock('../lib/command-init');
const cmdRun    = require.requireMock('../lib/command-run');
const version   = '0.2.0';

global.console.log = jest.fn();

describe('CLI', () => {
    beforeEach(() => {
        console.log.mock.calls  = [];
        cmdInit.mock.calls      = [];
        cmdRun.mock.calls       = [];
    });

    it('should print help on -h', () => {
        cli(['-h']);

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith([
            'Usage: linden [command] [options]',
            '',
            'Commands:',
            '    init            initializes configuration file',
            '    run             runs the regression',
            '',
            'Options:',
            '    -h, --help      prints this text',
            '    -v, --version   prints the version',
            ''
        ].join('\n'));
    });

    it('should print help on --help', () => {
        cli(['--help']);

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith([
            'Usage: linden [command] [options]',
            '',
            'Commands:',
            '    init            initializes configuration file',
            '    run             runs the regression',
            '',
            'Options:',
            '    -h, --help      prints this text',
            '    -v, --version   prints the version',
            ''
        ].join('\n'));
    });

    it('should print version on -v', () => {
        cli(['-v']);

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith('CLI version', version);
    });

    it('should print version on --version', () => {
        cli(['--version']);

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith('CLI version', version);
    });

    it('should run without parameters', function() {
        cli([]);

        expect(cmdRun.mock.calls.length).toBe(1);
        expect(cmdRun).toHaveBeenCalledWith('linden.json');
    });

     it('should run with parameters', function() {
        cli(['run', 'custom.json']);

        expect(cmdRun.mock.calls.length).toBe(1);
        expect(cmdRun).toHaveBeenCalledWith('custom.json');
    });

    it('should init', function() {
        cli(['init']);

        expect(cmdInit.mock.calls.length).toBe(1);
        expect(cmdInit).toHaveBeenCalledWith('linden.json');
    });

    it('should behave...', function() {
        cli(['please-no']);

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).toHaveBeenCalledWith('Unknown command');
    });
});
