global.LINDEN = require('../lib/globals');



describe('Helper', function() {
    var helper      = require('../lib/helper');
    var g           = global.LINDEN;

    beforeEach(function() {
        spyOn(g, 'log').and.callFake(function () { return ''; });
    });

    describe('isObject()', function() {
        it('should handle undefined', function() {
            expect(helper.isObject()).toEqual(false);
            expect(helper.isObject(undefined)).toEqual(false);
        });

        it('should handle empty object', function() {
            expect(helper.isObject({})).toEqual(false);
        });

        it('should handle arrays ', function() {
            expect(helper.isObject([])).toEqual(false);
        });

        it('should handle strings', function() {
            expect(helper.isObject('')).toEqual(false);
            expect(helper.isObject('a')).toEqual(false);
        });

        it('should handle null', function() {
            expect(helper.isObject(null)).toEqual(false);
        });

        it('should return true', function() {
            expect(helper.isObject({ a: '' })).toEqual(true);
        });
    });

    describe('isArray()', function() {
        it('should handle undefined', function() {
            expect(helper.isArray()).toEqual(false);
            expect(helper.isArray(undefined)).toEqual(false);
        });

        it('should handle empty array', function() {
            expect(helper.isArray([])).toEqual(false);
        });

        it('should handle strings', function() {
            expect(helper.isArray('')).toEqual(false);
            expect(helper.isArray('a')).toEqual(false);
        });

        it('should handle null', function() {
            expect(helper.isArray(null)).toEqual(false);
        });

        it('should return true', function() {
            expect(helper.isArray(['a'])).toEqual(true);
        });
    });

    describe('fileExists()', function() {
        it('should handle existing file', function() {
            expect(helper.fileExists('./spec/helper-spec.js')).toEqual(true);
        });

        it('should handle missing file', function() {
            expect(helper.fileExists()).toEqual(false);
            expect(helper.fileExists('not-existing-file.json')).toEqual(false);
        });

        it('should handle folders', function() {
            expect(helper.fileExists('/spec/')).toEqual(false);
        });
    });

    describe('folderExists()', function() {
        it('should handle existing folder', function() {
            expect(helper.folderExists('./spec')).toEqual(true);
            expect(helper.folderExists('./spec/support')).toEqual(true);
        });

        it('should handle missing fodler', function() {
            expect(helper.folderExists()).toEqual(false);
            expect(helper.folderExists('./abc')).toEqual(false);
        });

        it('should handle file', function() {
            expect(helper.folderExists('./abc.json')).toEqual(false);
        });
    });

    describe('printVersion()', function() {
        it('should print version', function() {
            expect(helper.printVersion).toBeDefined();

            helper.printVersion();

            expect(g.log).toHaveBeenCalled();
        });
    });

    describe('printHelp()', function() {
        it('should print help', function() {
            expect(helper.printHelp).toBeDefined();

            helper.printHelp();

            expect(g.log).toHaveBeenCalled();
        });
    });

});
