var path    = require('path');
var globals = {};
var argv    = require('minimist')(process.argv.slice(2), { alias: {
        c: 'config',
        h: 'help',
        v: 'version',
        s: 'silent'
    }});


//process.env.INIT_CWD  = process.cwd();
globals.cwd                 = process.cwd();
globals.defaultConfigPath   = path.join(path.dirname(process.argv[1]), '../config/linden.json');
globals.defaultConfigName   = 'linden.json';
globals.failed              = false;
globals.printTime           = false;

globals.flagConfig          = argv.config;
globals.flagHelp            = argv.help;
globals.flagVersion         = argv.version;
globals.flagSilent          = argv.silent;
globals.tasks               = argv._;

globals.configFile          = globals.flagConfig || globals.defaultConfigName;
globals.phantomPath         = require('phantomjs-prebuilt').path;

globals.package             = require('../package');
globals.log                 = require('./logger')({ silent: globals.flagSilent });
globals.config              = {};

module.exports = globals;
