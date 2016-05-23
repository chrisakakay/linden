#!/usr/bin/env node
'use strict';

// MAGIC!
global.LINDEN   = require('../lib/globals');

var g           = global.LINDEN;
var conf        = require('../lib/configurator');
var helper      = require('../lib/helper');

// Handling failed exit
process.once('exit', function(code) {
    if (code === 0 && g.failed) {
        process.exit(1);
    }
});

init();

function init() {
    if (g.tasks.length === 0) {
        if (g.flagVersion) {
            helper.printVersion();
            process.exit(0);
        }

        if (g.flagHelp) {
            helper.printHelp();
            process.exit(0);
        }

        conf.open();
    } else {
        switch (g.tasks[0]) {
            case 'init':
                conf.init();
                break;
            case 'run':
                conf.open();
                break;
            default: g.log('Unknown command');
        }
    }
}
