/* eslint-env jasmine */

describe('Configurator', function () {
    // var g = global.LINDEN = jasmine.createSpyObj('globals', ['log']);

    it('should have functions', function () {
        var configurator = require('../lib/configurator')();

        expect(configurator.init).toBeDefined();
        expect(configurator.open).toBeDefined();
    });

    describe('init()', function () {
        it('should skip if the config exists', function() {
            // configurator.init();
            // expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
            // expect(g.log).toHaveBeenCalledWith('Config file already exists');
        });

        it('should init a new config file if not exists', function() {
            // configurator.init();
            // expect(g.log).toHaveBeenCalledWith('Working directory:', g.cwd);
        });
    });

    describe('open()', function() {
        it('should log if the file is missing', function() {
            // configurator.open('abc.json');
            // expect(g.log).toHaveBeenCalledWith('Configuration not found:', 'abc.json');
            // expect(g.log).toHaveBeenCalledWith('Try running: linden init');
        });

        // TODO: Add more tests
    });
});
