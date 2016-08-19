/* eslint-env jasmine */

describe('Runner', function () {
    var g           = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
    var runner      = require('../lib/runner')(g);
    var mockCase    = {
        name:       'google',
        url:        'http://google.com',
        viewport:   {
            width: 1920,
            height: 1200
        }
    };

    it('should have functions', function () {
        expect(runner.init).toBeDefined();
        expect(runner.start).toBeDefined();
        expect(runner.reset).toBeDefined();
        expect(runner.getCases).toBeDefined();
        expect(runner.getDriver).toBeDefined();
    });

    describe('init()', function() {
        it('should init', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            var driver = runner.init().getDriver();

            expect(g.log).toHaveBeenCalledWith('Initializing driver');
            expect(driver).not.toEqual(null);
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toEqual('Driver');
        });
    });

    describe('start()', function() {
        it('should do nothing without cases', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            runner.reset();
            runner.start();

            expect(g.log).toHaveBeenCalledWith('Nothing to run');
        });

        it('should do nothing with empty cases', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            runner.reset();
            runner.init();
            runner.start();

            expect(g.log).toHaveBeenCalledWith('Driver already initialized');
        });

        it('should start if it has any case', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            runner.reset();
            runner.start([ mockCase ]);

            expect(g.log).toHaveBeenCalledWith('Initializing driver');
            // expect(g.log).toHaveBeenCalledWith('Cases to run: 1');
        });
    });

    describe('reset()', function() {
        it('should behave...', function() {
            runner.init();
            runner.reset();

            expect(runner.getDriver()).toEqual(null);
        });

        it('should behave...', function() {
            runner.reset();
            runner.reset();

            expect(runner.getDriver()).toEqual(null);
        });
    });

    describe('getCases()', function() {
        it('should work if its empty', function() {
            runner.reset();

            expect(runner.getCases()).toEqual([]);
        });

        it('should return arrays', function() {
            var response;

            runner.reset();

            response = runner.getCases();

            expect(response.length).toEqual(0);
        });
    });
});
