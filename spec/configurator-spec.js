/* eslint-env jasmine */

describe('Configurator', function () {
    var fs      = require('fs');
    var path    = require('path');
    var helper  = require('../lib/helper');

    beforeEach(function() {
        spyOn(fs, 'writeFileSync').and.callFake(function () { return; });
        spyOn(fs, 'mkdirSync').and.callFake(function () { return; });

        fs.mkdirSync.calls.reset();
    });

    it('should have functions', function () {
        var configurator = require('../lib/configurator')();

        expect(configurator.init).toBeDefined();
        expect(configurator.open).toBeDefined();
    });

    describe('init()', function () {
        it('should skip if the config exists', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(helper, 'fileExists').and.returnValue(true);
            spyOn(g, 'log').and.callFake(function () {});

            conf.init();

            expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
            expect(g.log).toHaveBeenCalledWith('Config file already exists');
        });

        it('should init a new config file if not exists', function() {
            var g       = require('../lib/globals')({}, { cwd: process.cwd(), basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(helper, 'fileExists').and.returnValue(false);
            spyOn(fs, 'readFileSync').and.callFake(function () { return; });
            spyOn(g, 'log').and.callFake(function () {});

            conf.init();

            expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
            expect(g.log).not.toHaveBeenCalledWith('Config file already exists');
            expect(g.log).toHaveBeenCalledWith('Copying:', g.defaultConfigPath);
            expect(fs.readFileSync).toHaveBeenCalled();
            expect(fs.writeFileSync).toHaveBeenCalled();
            expect(g.log).toHaveBeenCalledWith('Done, try to run now');
        });
    });

    describe('open()', function() {
        it('should log if the file is missing', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(helper, 'fileExists').and.returnValue(false);
            spyOn(g, 'log').and.callFake(function () {});

            conf.open('abc.json');

            expect(g.log).toHaveBeenCalledWith('Configuration not found:', 'abc.json');
            expect(g.log).toHaveBeenCalledWith('Try running: linden init');
        });

        it('should throw error', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(helper, 'fileExists').and.returnValue(true);
            spyOn(g, 'log').and.callFake(function () {});

            conf.open('abc.json');

            expect(g.log).toHaveBeenCalledWith('File error.');
        });

        it('should open Configuration', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(helper, 'fileExists').and.returnValue(true);
            spyOn(g, 'log').and.callFake(function () {});
            spyOn(JSON, 'parse').and.callFake(function () {});

            conf.open('spec/mock_data/linden-no-cases.json');

            expect(JSON.parse).toHaveBeenCalled();
            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-no-cases.json');
        });
    });

    describe('processConfig()', function() {
        it('should stop if there are no cases', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(g, 'log').and.callFake(function () {});

            conf.processConfig('spec/mock_data/linden-no-cases.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-no-cases.json');
            expect(g.log).toHaveBeenCalledWith('No cases defined');
        });

        it('should stop if the cases array is empty', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(g, 'log').and.callFake(function () {});

            conf.processConfig('spec/mock_data/linden-empty-cases.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-empty-cases.json');
            expect(g.log).toHaveBeenCalledWith('No cases defined');
        });

        it('should handle one bad case when folder exists', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(g, 'log').and.callFake(function () {});
            spyOn(helper, 'folderExists').and.returnValue(true);

            conf.processConfig('spec/mock_data/linden-one-bad-case.json');

            expect(fs.mkdirSync).not.toHaveBeenCalledWith(path.join(g.cwd, g.config.dir));
            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');
            expect(g.log).not.toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).not.toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).not.toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
        });

        it('should handle one bad case when folder not exists', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(g, 'log').and.callFake(function () {});
            spyOn(helper, 'folderExists').and.returnValue(false);

            conf.processConfig('spec/mock_data/linden-one-bad-case.json');

            expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(g.cwd, g.config.dir));
            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');
            expect(g.log).not.toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).not.toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).not.toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
        });

        it('should handle no dir and one bad case', function() {
            var g       = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
            var conf    = require('../lib/configurator')(g);

            spyOn(g, 'log').and.callFake(function () {});

            conf.processConfig('spec/mock_data/linden-one-bad-case-no-dir.json');

            expect(g.log).toHaveBeenCalledWith('Using configuration:', 'spec/mock_data/linden-one-bad-case-no-dir.json');
            expect(g.log).not.toHaveBeenCalledWith('No cases defined');

            expect(g.config.dir).toEqual('./linden');
            expect(g.log).toHaveBeenCalledWith('No root directory defined for saving files');
            expect(g.log).toHaveBeenCalledWith('Using directory "./linden"');
            expect(g.log).toHaveBeenCalledWith('Define "dir" parameter in the configuration if you want to use a different folder');
            expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(g.cwd, g.config.dir, g.runDateTime));
            expect(g.log).toHaveBeenCalledWith('Data will be saved to:', path.join(g.cwd, g.config.dir, g.runDateTime));
        });
    });
});
