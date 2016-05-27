global.LINDEN = require('../lib/globals');

describe('Runner', function () {
    var runner      = require('../lib/runner');
    var g           = global.LINDEN;
    var webdriver   = jasmine.createSpyObj('webdriver', ['Builder']);

    beforeEach(function () {
        spyOn(g, 'log').and.callFake(function () { return ''; });
    });

    it('should have functions', function () {
        expect(runner.init).toBeDefined();
        expect(runner.start).toBeDefined();
        expect(runner.addCase).toBeDefined();
        expect(runner.validate).toBeDefined();
    });

    describe('init()', function() {
        it('should init', function() {
            var driver = runner.init();

            expect(g.log).toHaveBeenCalledWith('Initializing driver');
            expect(driver).not.toEqual(null);
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toEqual('Driver');
        });
    });
});
