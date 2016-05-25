var globals = {};
var argv    = require('minimist')(process.argv.slice(2));
var path    = require('path');

//process.env.INIT_CWD  = process.cwd();
globals.cwd                 = process.cwd();
globals.defaultConfigPath   = path.join(path.dirname(process.argv[1]), '../config/linden.json');
globals.defaultConfigName   = 'linden.json';
globals.failed              = false;
globals.printTime           = false;

globals.flagConfig          = argv.c || argv.config;
globals.flagHelp            = argv.h || argv.help;
globals.flagVersion         = argv.v || argv.version;
globals.flagSilent          = argv.s || argv.silent;
globals.tasks               = argv._;

globals.configFile      = globals.flagConfig || globals.defaultConfigName;

globals.package         = require('../package');
globals.log             = require('./logger')({ silent: globals.flagSilent });

module.exports = globals;
