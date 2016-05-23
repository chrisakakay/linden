var globals = {};
var argv;

global.LINDEN           = globals;

argv = require('minimist')(process.argv.slice(2));

//process.env.INIT_CWD  = process.cwd();
globals.cwd             = process.cwd();
globals.defaultConfig   = 'linden.json';
globals.failed          = false;
globals.printTime       = false;

globals.flagConfig      = argv.c || argv.config;
globals.flagHelp        = argv.h || argv.help;
globals.flagVersion     = argv.v || argv.version;
globals.flagSilent      = argv.s || argv.silent;
globals.tasks           = argv._;

globals.configFile      = globals.flagConfig || globals.defaultConfig;

globals.package         = require('../package');
globals.log             = require('./logger')({ silent: globals.flagSilent });
globals.helper          = require('./helper');

module.exports = globals;
