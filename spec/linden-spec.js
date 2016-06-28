/* eslint-env jasmine */

describe('Linden', function () {
    // var g     = global.LINDEN = jasmine.createSpyObj('globals', ['log']);
    // var conf = jasmine.createSpyObj('conf', ['init', 'open']);

    beforeEach(function () {
        spyOn(console, 'log').and.callFake(function () { return ''; });
        spyOn(process, 'exit').and.callFake(function () {});
    });

    it('should handle log version', function() {
        require('../lib/linden')({ version: true }, { cwd: 'cwd', basePath: 'basePath' });

        // expect(g.log).toHaveBeenCalled();
    });

    it('should handle log help', function() {
        require('../lib/linden')({ help: true }, { cwd: 'cwd', basePath: 'basePath' });

        // expect(g.log).toHaveBeenCalled();
    });

    it('should handle parameterless call', function() {
        require('../lib/linden')({}, { cwd: 'cwd', basePath: 'basePath' });

        // expect(conf.open).toHaveBeenCalled();
    });

    it('should handle run call', function() {
        require('../lib/linden')({ _: ['run'] }, { cwd: 'cwd', basePath: 'basePath' });

        // expect(conf.open).toHaveBeenCalled();
    });

    it('should handle init call', function() {
        require('../lib/linden')({ _: ['init'] }, { cwd: 'cwd', basePath: 'basePath' });

        // expect(conf.init).toHaveBeenCalled();
    });

    it('should handle unknown command', function() {
        require('../lib/linden')({ _: ['what-the-hell'] }, { cwd: 'cwd', basePath: 'basePath' });

        // expect(g.log).toHaveBeenCalledWith('Unknown command');
    });
});
