var linden = jasmine.createSpyObj('global.LINDEN', ['log']);
var c      = require('chalk');

describe('Logger', function() {
    beforeEach(function() {
        delete require.cache[require.resolve('../lib/logger')];
    });

    describe('logger', function() {
        it('should be silent', function() {
            var logger = require('../lib/logger')({ silent: true });

            expect(logger()).toEqual(undefined);
        });

        it('should log fine', function() {
            var logger = require('../lib/logger')();
            spyOn(process.stdout, 'write').and.callThrough();

            expect(logger()).not.toEqual(undefined);
            expect(process.stdout.write).toHaveBeenCalled();
        });
    });
});
