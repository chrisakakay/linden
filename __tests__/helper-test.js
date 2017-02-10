'use strict';

/* eslint-env jest */

jest.mock('fs');
jest.mock('path');

const helper = require('../lib/helper');

describe('helper', () => {
    it('fileExists()', () => {
        expect(helper.fileExists()).toBe(false);
        expect(helper.fileExists('')).toBe(false);
        expect(helper.fileExists('not-existing-file')).toBe(false);
        expect(helper.fileExists('existing-file')).toBe(true);
        expect(helper.fileExists('existing-config')).toBe(true);
    });

    it('folderExists()', () => {
        expect(helper.folderExists()).toBe(false);
        expect(helper.folderExists('')).toBe(false);
        expect(helper.folderExists('not-existing-folder')).toBe(false);
        expect(helper.folderExists('existing-folder')).toBe(true);
    });

    it('getCWD()', () => {
        expect(helper.getCWD()).toBe(process.cwd());
    });

    it('getBasePath()', () => {
        expect(helper.getBasePath()).toBe(process.argv[1]);
    });

    it('getDefaultConfig()', () => {
        expect(helper.getDefaultConfig()).toEqual({ dir: './linden', cases: [] });
    });
});
