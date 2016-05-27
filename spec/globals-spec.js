describe('Globals', function() {
    var g = require('../lib/globals');

    it('should have variables', function() {
        expect(g.cwd).toEqual(process.cwd());
        //expect(g.defaultConfigPath).toEqual() // PACKAGE_PATH/config/linden.json
        expect(g.defaultConfigName).toEqual('linden.json');
        expect(g.flagConfig).toEqual(false);
        expect(g.flagHelp).toEqual(false);
        expect(g.flagVersion).toEqual(false);
        expect(g.flagSilent).toEqual(false);
        expect(g.tasks).toEqual([]);
        expect(g.configFile).toEqual('linden.json');
        expect(g.phantomPath).toEqual(require('phantomjs-prebuilt').path);
        expect(g.package).toBeDefined();
        expect(g.log).toBeDefined();
        expect(g.config).toEqual({});
    });
});
