'use strict';

jest.mock('fs');
jest.mock('path');

const helper = require('../lib/helper');

describe('helper', () => {
    it('fileExists()', () => {
        expect(helper.fileExists()).toBe(false);
        expect(helper.fileExists('')).toBe(false);
        expect(helper.fileExists('not-existing-file')).toBe(false);
        expect(helper.fileExists('existing-file')).toBe(true);
    });

    it('folderExists()', () => {
        expect(helper.folderExists()).toBe(false);
        expect(helper.folderExists('')).toBe(false);
        expect(helper.folderExists('not-existing-folder')).toBe(false);
        expect(helper.folderExists('existing-folder')).toBe(true);
    });

    it('isObject()', () => {
        expect(helper.isObject()).toBe(false);
        expect(helper.isObject(undefined)).toBe(false);
        expect(helper.isObject([])).toBe(false);
        expect(helper.isObject({})).toBe(false);
        expect(helper.isObject('')).toBe(false);
        expect(helper.isObject('a')).toBe(false);
        expect(helper.isObject(null)).toBe(false);

        expect(helper.isObject({ a: 1 })).toBe(true);
    });

    it('isArray()', () => {
        expect(helper.isArray()).toBe(false);
        expect(helper.isArray(undefined)).toBe(false);
        expect(helper.isArray([])).toBe(false);
        expect(helper.isArray({})).toBe(false);
        expect(helper.isArray('')).toBe(false);
        expect(helper.isArray('a')).toBe(false);
        expect(helper.isArray(null)).toBe(false);

        expect(helper.isArray(['a'])).toBe(true);
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
