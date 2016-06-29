/* eslint-env jasmine */

describe('Linden', function () {
    beforeEach(function () {
        spyOn(console, 'log').and.callFake(function () { return ''; });
        spyOn(process, 'exit').and.callFake(function () {});
    });

    it('should handle log version', function() {
        var g = require('../lib/globals')({ version: true }, { cwd: 'cwd', basePath: 'basePath' });
        spyOn(g, 'log').and.callFake(function () {});

        require('../lib/linden')(g);

        expect(g.log).toHaveBeenCalled();
    });

    it('should handle log help', function() {
        var g = require('../lib/globals')({ help: true }, { cwd: 'cwd', basePath: 'basePath' });
        spyOn(g, 'log').and.callFake(function () {});

        require('../lib/linden')(g);

        expect(g.log).toHaveBeenCalled();
    });

    it('should handle parameterless call', function() {
        var g = require('../lib/globals')({}, { cwd: 'cwd', basePath: 'basePath' });

        require('../lib/linden')(g);

        // expect(conf.open).toHaveBeenCalled();
    });

    it('should handle run call', function() {
        var g = require('../lib/globals')({ _: ['run'] }, { cwd: 'cwd', basePath: 'basePath' });

        require('../lib/linden')(g);

        // expect(conf.open).toHaveBeenCalled();
    });

    it('should handle init call', function() {
        var g = require('../lib/globals')({ _: ['init'] }, { cwd: 'cwd', basePath: 'basePath' });

        require('../lib/linden')(g);

        // expect(conf.init).toHaveBeenCalled();
    });

    it('should handle unknown command', function() {
        var g = require('../lib/globals')({ _: ['what-the-hell'] }, { cwd: 'cwd', basePath: 'basePath' });
        spyOn(g, 'log').and.callFake(function () {});

        require('../lib/linden')(g);

        expect(g.log).toHaveBeenCalledWith('Unknown command');
    });
});
