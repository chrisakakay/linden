var c = require('chalk');

describe('Logger', function() {
    beforeEach(function() {
        delete require.cache[require.resolve('../lib/logger')];
    });

    describe('logger', function() {
        it('should be silent', function() {
            var logger = require('../lib/logger')({ silent: true });

            expect(logger()).toEqual(undefined);
            expect(logger).toBeDefined();
        });

        it('should log fine', function() {
            var logger = require('../lib/logger')();
            spyOn(console, 'log').and.callThrough();
            spyOn(global, 'Date').and.callFake(function() {
                return { toTimeString: function () { return '' }}
            });

            expect(logger).toBeDefined();
            expect(logger()).not.toEqual(undefined);
            expect(console.log).toHaveBeenCalled();
        });
    });
});
