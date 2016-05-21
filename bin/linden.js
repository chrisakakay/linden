#!/usr/bin/env node

'use strict';

// Storing the original directory
process.env.INIT_CWD = process.cwd();

// All the require stuff
var startTime       = process.hrtime();

var argv            = require('minimist')(process.argv.slice(2));
var cliPackage      = require('../package');
var logger          = require('../lib/logger')({ silent: (argv.s || argv.silent) });
var fs              = require('fs');

var defaultConfig   = 'linden.json';
var configFile      = argv.c || argv.config || defaultConfig;
var failed          = false;
var printTime       = false;

// Handling failed exit
process.once('exit', function(code) {
    if (printTime) {
        logger.log('Completed in', logger.time(startTime));
    }

    if (code === 0 && failed) {
        process.exit(1);
    }
});

init();

function copyDefaultConfig() {

}

function fileExists(fname) {
    try {
        return fs.statSync(fname).isFile();
    } catch (err) {
        return false;
    }
}

function openConfig() {
    if (fileExists(configFile)) {
        logger.log('Using configuration:', logger.color.green(configFile));
    } else {
        logger.log(logger.color.red('Configuration not found:'), logger.color.yellow(configFile));
        logger.log(logger.color.red('Try running: linden init'));
    }
}

function init() {
    if (argv._.length === 0) {
        if (argv.v || argv.version) {
            logger.log('CLI version', cliPackage.version);
            process.exit(0);
        }

        if (argv.h || argv.help) {
            console.log([
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

        openConfig();
    } else {
        switch (argv._[0]) {
            case 'init':
                copyDefaultConfig();
                break;
            case 'run':
                openConfig();
                break;
            default: console.log('Unknown command');
        }
    }
}
