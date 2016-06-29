#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), { alias: {
        c: 'config',
        h: 'help',
        v: 'version',
        s: 'silent'
    }});
var paths = {
        cwd: process.cwd(),
        basePath: process.argv[1]
    };
var g     = require('../lib/globals')(argv, paths);

require('../lib/linden')(g);
