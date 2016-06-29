var path    = require('path');
var globals = {
        runDateTime:        Date.now().toString(),
        package:            require('../package'),
        config:             {},
        defaultConfigName:  'linden.json'
    };

module.exports = function (args, paths) {
    globals.flags               = {
        config:     args && args.config     || false,
        silent:     args && args.silent     || false,
        version:    args && args.version    || false,
        help:       args && args.help       || false
    };
    globals.cwd                 = paths.cwd;
    globals.defaultConfigPath   = path.join(path.dirname(paths.basePath), '../config/', 'linden.json');
    globals.tasks               = args && args._ && args._.length > 0 ? args._ : ['run'];
    globals.configFile          = globals.flags.config || globals.defaultConfigName;
    globals.log                 = require('./logger')({ silent: globals.flags.silent });

    return globals;
};
