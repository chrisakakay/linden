var g       = global.LINDEN;
var fs      = require('fs');
var path    = require('path');
var c       = require('chalk');
var helper  = require('./helper');

function processConfig(fName) {
    var conf = JSON.parse(fs.readFileSync(fName, 'utf8'));

    g.log(c.white('Using configuration:'), c.yellow(fName));

    if (!helper.isObject(conf.viewports)) {
        g.log(c.white('INFO: No common viewports defined'));
    }

    if (!helper.isArray(conf.cases)) {
        g.log(c.white('INFO: No cases defined'));
    }
}

function open(fName) {
    if (helper.fileExists(fName)) {
        try {
            processConfig(fName);
        } catch (err) {
            g.log(c.red('Malformed configuration:', c.yellow(fName)));
        }
    } else {
        g.log(c.red('Configuration not found:'), c.yellow(fName));
        g.log(c.red('Try running: linden init'));
    }
}

function init() {
    g.log(c.white('Working directory:'), c.yellow(g.cwd));

    // TODO: check if already existing

    try {
        g.log(c.white('Copying:'), c.yellow(g.defaultConfigPath));
        fs.writeFileSync(path.join(g.cwd, g.defaultConfigName), fs.readFileSync(g.defaultConfigPath));
        g.log(c.white('Done, try to run now'));
    } catch(err) {
        g.log(c.red(err));
    }
}

module.exports = {
    open: open,
    init: init
}
