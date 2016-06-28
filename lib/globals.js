var path    = require('path');
var globals = {
        runDateTime:        Date.now().toString(),
        package:            require('../package'),
        config:             {},
        defaultConfigName:  'linden.json',

    };

module.exports = function (args, paths) {
    var flagConfig              = args && args.config || false;
    var flagSilent              = args && args.silent || false;

    globals.cwd                 = paths.cwd;
    globals.defaultConfigPath   = path.join(path.dirname(paths.basePath), '../config/', 'linden.json');
    globals.tasks               = args && args._ && args._.length > 0 ? args._ : ['run'];
    globals.configFile          = flagConfig || globals.defaultConfigName;
    globals.log                 = require('./logger')({ silent: flagSilent });

    return globals;
};
