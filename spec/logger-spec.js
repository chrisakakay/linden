/* eslint-env jasmine */
describe('Logger', function() {
    beforeEach(function() {
        delete require.cache[require.resolve('../lib/logger')];

        spyOn(console, 'log').and.callFake(function () { return ''; });
        spyOn(global, 'Date').and.callFake(function () {
            return { toTimeString: function () { return ''; }};
        });
    });

    describe('logger', function () {
        it('should be silent', function () {
            var logger = require('../lib/logger')({ silent: true });

            expect(logger()).toEqual(undefined);
            expect(logger).toBeDefined();
        });

        it('should log fine', function () {
            var logger = require('../lib/logger')();

            expect(logger).toBeDefined();
            expect(logger()).not.toEqual(undefined);
            expect(console.log).toHaveBeenCalled();
        });
    });
});
