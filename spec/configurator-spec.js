/* eslint-env jasmine */

describe('Configurator', function () {
    var fs      = require('fs');
    var helper  = require('../lib/helper');
    // var path    = require('path');

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
});
