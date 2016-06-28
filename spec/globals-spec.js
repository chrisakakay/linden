/* eslint-env jasmine */
describe('Globals', function() {
    it('should have variables with empty stuff', function() {
        var g = require('../lib/globals')({}, { cwd: 'cwd'});

        expect(g.cwd).toEqual('cwd');
        // expect(g.defaultConfigPath).toEqual() // PACKAGE_PATH/config/linden.json
        expect(g.defaultConfigName).toEqual('linden.json');
        expect(g.tasks).toEqual(['run']);
        expect(g.configFile).toEqual('linden.json');
        expect(g.package).toBeDefined();
        expect(g.log).toBeDefined();
        expect(g.config).toEqual({});
    });

    it('should have variables with give job', function() {
        var g = require('../lib/globals')({ '_': ['init'] }, { cwd: 'cwd'});

        expect(g.cwd).toEqual('cwd');
        // expect(g.defaultConfigPath).toEqual() // PACKAGE_PATH/config/linden.json
        expect(g.defaultConfigName).toEqual('linden.json');
        expect(g.tasks).toEqual(['init']);
        expect(g.configFile).toEqual('linden.json');
        expect(g.package).toBeDefined();
        expect(g.log).toBeDefined();
        expect(g.config).toEqual({});
    });
});
