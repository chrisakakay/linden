/* eslint-env jasmine */

describe('Configurator', function () {
    var fs      = require('fs');
    var helper  = require('../lib/helper');

    beforeEach(function() {
        spyOn(fs, 'writeFileSync').and.callFake(function () { });
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
            spyOn(g, 'log').and.callFake(function () {});

            conf.init();

            expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
            expect(g.log).not.toHaveBeenCalledWith('Config file already exists');
            expect(g.log).toHaveBeenCalledWith('Copying:', g.defaultConfigPath);
            // TODO FIX THIS
            //expect(fs.readFileSync).toHaveBeenCalled();
            //expect(fs.writeFileSync).toHaveBeenCalled();
            //expect(g.log).toHaveBeenCalledWith('Done, try to run now');
        });
    });

    describe('open()', function() {
        it('should log if the file is missing', function() {
            // configurator.open('abc.json');
            // expect(g.log).toHaveBeenCalledWith('Configuration not found:', 'abc.json');
            // expect(g.log).toHaveBeenCalledWith('Try running: linden init');
        });

        // TODO: Add more tests
    });
});
