#!/usr/bin/env node
'use strict';

// MAGIC!
global.LINDEN   = require('../lib/globals');

var g           = global.LINDEN;
var conf        = require('../lib/configurator');
var helper      = require('../lib/helper');
var runner      = require('../lib/runner');

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

        conf.open(g.configFile);
    } else {
        switch (g.tasks[0]) {
            case 'init':
                conf.init();
                break;
            case 'run':
                conf.open(g.configFile);
                break;
            default: g.log('Unknown command');
        }
    }
}
