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
        expect(runner.addCase).toBeDefined();
        expect(runner.validate).toBeDefined();
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

    describe('addCase()', function() {
        it('should return true', function() {
            var response;

            runner.reset();
            response = runner.addCase(mockCase);

            expect(response).toBeTruthy();
            expect(runner.getCases().length).toEqual(1);
        });

        it('should return false', function() {
            var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

            spyOn(g, 'log').and.callFake(function () {});

            expect(runner.addCase()).toBeFalsy();
            expect(g.log).toHaveBeenCalledWith('Invalid case');
        });
    });

    describe('validate()', function() {
        it('should return true', function() {
            expect(runner.validate(mockCase)).toBeTruthy();
        });

        it('should handle undefined', function() {
            expect(runner.validate()).toBeFalsy();
            expect(runner.validate(undefined)).toBeFalsy();
        });

        it('should handle null', function() {
            expect(runner.validate(null)).toBeFalsy();
        });

        it('should handle empty object', function() {
            expect(runner.validate({})).toBeFalsy();
        });

        it('should handle nameless object', function() {
            var falsyData = {
                    url: 'url',
                    viewport: { width: 1, height: 1 }
                };

            expect(runner.validate(falsyData)).toBeFalsy();
        });

        it('should handle urlless object', function() {
            var falsyData = {
                    name: 'name',
                    viewport: { width: 1, height: 1 }
                };

            expect(runner.validate(falsyData)).toBeFalsy();
        });

        it('should handle viewportless object', function() {
            var falsyData = {
                    name: 'name',
                    url: 'url'
                };

            expect(runner.validate(falsyData)).toBeFalsy();
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
            runner.addCase(mockCase);

            response = runner.getCases();

            expect(response.length).toEqual(1);
            expect(response[0]).toEqual(mockCase);
        });
    });
});
