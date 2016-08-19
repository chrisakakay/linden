/* eslint-env jasmine */

describe('Parser', function () {
    var g           = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
    var fs          = require('fs');
    var path        = require('path');
    var helper      = require('../lib/helper');
    var parser      = require('../lib/parser')(g);
    var mockCase    = {
            name:       'google',
            url:        'http://google.com',
            viewport:   {
                width: 1920,
                height: 1200
            }
        };

    beforeEach(function() {
        spyOn(fs, 'writeFileSync').and.callFake(function () { return; });
        spyOn(fs, 'mkdirSync').and.callFake(function () { return; });
        spyOn(g, 'log').and.callFake(function () {});

        fs.mkdirSync.calls.reset();
    });

    it('should have functions', function () {
        var parser = require('../lib/parser')(g);

        expect(parser.parseConfiguration).toBeDefined();
        expect(parser.validateCase).toBeDefined();
    });

    describe('validateCase()', function() {
        it('should return true', function() {
            expect(parser.validateCase(mockCase)).toBeTruthy();
        });

        it('should handle undefined', function() {
            expect(parser.validateCase()).toBeFalsy();
            expect(parser.validateCase(undefined)).toBeFalsy();
        });

        it('should handle null', function() {
            expect(parser.validateCase(null)).toBeFalsy();
        });

        it('should handle empty object', function() {
            expect(parser.validateCase({})).toBeFalsy();
        });

        it('should handle nameless object', function() {
            var falsyData = {
                    url: 'url',
                    viewport: { width: 1, height: 1 }
                };

            expect(parser.validateCase(falsyData)).toBeFalsy();
        });

        it('should handle urlless object', function() {
            var falsyData = {
                    name: 'name',
                    viewport: { width: 1, height: 1 }
                };

            expect(parser.validateCase(falsyData)).toBeFalsy();
        });

        it('should handle viewportless object', function() {
            var falsyData = {
                    name: 'name',
                    url: 'url'
                };

            expect(parser.validateCase(falsyData)).toBeFalsy();
        });
    });

    describe('parseConfiguration()', function() {
        it('should stop if there are no cases', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var parser  = require('../lib/parser')(g);

            spyOn(g, 'log').and.callFake(function () {});

            parser.parseConfiguration('spec/mock_data/linden-no-cases.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-no-cases.json');
            expect(g.log).toHaveBeenCalledWith('No cases defined');
        });

        it('should stop if the cases array is empty', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var parser  = require('../lib/parser')(g);

            spyOn(g, 'log').and.callFake(function () {});

            parser.parseConfiguration('spec/mock_data/linden-empty-cases.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-empty-cases.json');
            expect(g.log).toHaveBeenCalledWith('No cases defined');
        });

        it('should handle one bad case when folder exists', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var parser  = require('../lib/parser')(g);

            spyOn(g, 'log').and.callFake(function () {});
            spyOn(helper, 'folderExists').and.returnValue(true);

            parser.parseConfiguration('spec/mock_data/linden-one-bad-case.json');

            expect(fs.mkdirSync).not.toHaveBeenCalledWith(path.join(g.cwd, g.config.dir));
            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');
            expect(g.log).not.toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).not.toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).not.toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
        });

        it('should handle one bad case when folder not exists', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var parser  = require('../lib/parser')(g);

            spyOn(g, 'log').and.callFake(function () {});
            spyOn(helper, 'folderExists').and.returnValue(false);

            parser.parseConfiguration('spec/mock_data/linden-one-bad-case.json');

            expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(g.cwd, g.config.dir));
            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');
            expect(g.log).not.toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).not.toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).not.toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
        });

        it('should handle no dir and one bad case', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var parser  = require('../lib/parser')(g);

            spyOn(g, 'log').and.callFake(function () {});

            parser.parseConfiguration('spec/mock_data/linden-one-bad-case-no-dir.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case-no-dir.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');

            expect(g.config.dir).toEqual('./linden');
            expect(g.log).toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
            expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(g.cwd, g.config.dir, g.runDateTime));
            expect(g.log).toHaveBeenCalledWith('Data will be saved to:', path.join(g.cwd, g.config.dir, g.runDateTime));

            // TODO: RUNNER SHOULD BE TESTED SOMEHOW
        });
    });
});
