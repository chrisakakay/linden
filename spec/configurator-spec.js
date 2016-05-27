global.LINDEN = require('../lib/globals');

describe('Configurator', function () {
    var configurator    = require('../lib/configurator');
    var g               = global.LINDEN;

    beforeEach(function () {
        spyOn(g, 'log').and.callFake(function () { return ''; });
    });

    it('should have functions', function () {
        expect(configurator.init).toBeDefined();
        expect(configurator.open).toBeDefined();
    });

    describe('init()', function () {
        it('should write out basic log', function() {
            configurator.init();
            expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
        });

        it('should skip if the config exists', function() {
            configurator.init();
            expect(g.log).toHaveBeenCalledWith('Config file already exists');
        });

        it('should init a new config file if not exists', function() {
            // TODO
        });
    });

    describe('open()', function() {
        it('should log if the file is missing', function() {
            configurator.open('abc.json');
            expect(g.log).toHaveBeenCalledWith('Configuration not found:', 'abc.json');
            expect(g.log).toHaveBeenCalledWith('Try running: linden init');
        });

        // TODO: Add more tests
    });

});
