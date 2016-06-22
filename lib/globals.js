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

globals.flagConfig          = argv.config   || false;
globals.flagHelp            = argv.help     || false;
globals.flagVersion         = argv.version  || false;
globals.flagSilent          = argv.silent   || false;
globals.tasks               = argv._.length > 0 ? argv._ : ['run'];

globals.configFile          = globals.flagConfig || globals.defaultConfigName;
globals.phantomPath         = require('phantomjs-prebuilt').path;

globals.package             = require('../package');
globals.log                 = require('./logger')({ silent: globals.flagSilent });
globals.config              = {};
globals.runDateTime         = Date.now().toString();

module.exports = globals;
