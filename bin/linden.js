#!/usr/bin/env node
'use strict';

// MAGIC!
global.LINDEN   = require('../lib/globals');

var g           = global.LINDEN;
var conf        = require('../lib/configurator');

if (g.flagVersion) {
    g.log('CLI version', g.package.version);
    process.exit(0);
}

if (g.flagHelp) {
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
