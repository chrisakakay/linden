describe('Logger', function() {
    beforeEach(function() {
        spyOn(console.log, 'apply').and.callThrough();
    });

    describe('init', function() {
        it('should init noop', function() {
            var logger = require('../lib/logger')({ silent: true });

            expect(logger()).toEqual(undefined);
            delete require.cache[require.resolve('../lib/logger')];
        });

        it('should init fine', function() {
            var logger = require('../lib/logger');

            expect(logger()).not.toEqual(undefined);
            delete require.cache[require.resolve('../lib/logger')];
        });
    });

    // Inside the logging function will be tested later
});
