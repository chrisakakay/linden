'use strict';

jest.mock('fs');
jest.mock('path');

const fs        = require.requireMock('fs');
const path      = require.requireMock('path');
const cmdInit   = require('../lib/command-init');

describe('CMD: init', () => {
    it('should should create config', () => {
        cmdInit('not-existing-file');

        expect(fs.writeFileSync.mock.calls.length).toBe(1);
        expect(fs.writeFileSync.mock.calls[0]).toEqual(['not-existing-file', { dir: './linden', cases: [] }])
    });

    it('should not create config', function() {
        fs.writeFileSync.mock.calls = [];

        cmdInit('existing-file');

        expect(fs.writeFileSync.mock.calls.length).toBe(0);
    });
});

