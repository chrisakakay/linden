module.exports = function (g) {
    var conf   = require('./configurator')(g);

    if (g.flags.version) {
        g.log('CLI version', g.package.version);
        process.exit(0);
    } else if (g.flags.help) {
        g.log([
            'Usage: linden [command] [options]',
            '',
            'Options:',
            '  -v, --version\t prints the version',
            '  -s, --silent \t turns of logging',
            '  -c, --config \t specifies config file',
            '',
            'Commands:',
            '  init\t\tinitializes configuration file',
            '  run \t\truns the regression',
            '',
            'The default command is: run'
        ].join('\n'));
        process.exit(0);
    }

    switch (g.tasks[0]) {
        case 'init':
            conf.init();
            break;
        case 'run':
            conf.open(g.configFile);
            break;
        default: g.log('Unknown command');
    }
};