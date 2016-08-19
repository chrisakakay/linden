/* eslint-env jasmine */

describe('Runner', function () {
    var g           = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });
    var runner      = require('../lib/runner')(g);

    it('should have functions', function () {
        expect(runner.init).toBeDefined();
        expect(runner.start).toBeDefined();
        expect(runner.reset).toBeDefined();
        expect(runner.getCases).toBeDefined();
    });

    describe('init()', function() {
        it('should init', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            var driver = runner.init();

            expect(g.log).toHaveBeenCalledWith('Initializing driver');
            expect(driver).not.toEqual(null);
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toEqual('Driver');
        });
    });

    describe('start()', function() {

    });

    describe('reset()', function() {

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
