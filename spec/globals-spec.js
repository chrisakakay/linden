/* eslint-env jasmine */
describe('Globals', function() {
    beforeEach(function () {
        delete require.cache[require.resolve('../lib/globals')];
    });

    it('should have variables with empty stuff', function() {
        var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: '.'});

        expect(g.cwd).toEqual('cwd');
        // expect(g.defaultConfigPath).toEqual() // PACKAGE_PATH/config/linden.json
        expect(g.defaultConfigName).toEqual('linden.json');
        expect(g.tasks).toEqual(['run']);
        expect(g.configFile).toEqual('linden.json');
        expect(g.package).toBeDefined();
        expect(g.log).toBeDefined();
        expect(g.config).toEqual({});
    });

    it('should have variables with given job', function() {
        var g = require('../lib/globals')({ '_': ['init'] }, { cwd: 'cwd', basePath: '.'});

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
