var path    = require('path');
var globals = {
        cwd:                process.cwd(),
        runDateTime:        Date.now().toString(),
        package:            require('../package'),
        config:             {},
        defaultConfigName:  'linden.json',
        defaultConfigPath:  path.join(path.dirname(process.argv[1]), '../config/', 'linden.json')
    };

module.exports = function (args) {
    var flagConfig          = args && args.config || false;
    var flagSilent          = args && args.silent || false;

    globals.tasks           = args && args._ && args._.length > 0 ? args._ : ['run'];
    globals.configFile      = flagConfig || globals.defaultConfigName;
    globals.log             = require('./logger')({ silent: flagSilent });

    return globals;
};
