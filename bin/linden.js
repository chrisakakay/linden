#!/usr/bin/env node
'use strict';

const argv      = require('minimist')(process.argv.slice(2), { alias: { h: 'help', v: 'version' }});
const command   = (argv._ && argv._.length > 0) ? argv._[0] : 'run';
const config    = command && argv._.length > 1 ? argv._[1] : 'linden.json';

if (argv.help) {
    console.log([
        'Usage: linden [command] [options]',
        '',
        'Commands:',
        '    init            initializes configuration file',
        '    run             runs the regression',
        '',
        'Options:',
        '    -h, --help      prints this text',
        '    -v, --version   prints the version',
        ''
    ].join('\n'));
    process.exit(0);
}

if (argv.version) {
    console.log('CLI version', require('../package').version);
    process.exit(0);
}

switch (command) {
    case 'init':
        require('../lib/command-init')();
        break;
    case 'run':
        require('../lib/command-run')(config);
        break;
    default:
        console.log('Unknown command');
}
