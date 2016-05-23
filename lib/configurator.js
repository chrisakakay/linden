var g   = global.LINDEN;
var fs  = require('fs');
var c   = require('chalk');

function processConfig(fName) {
    var conf = JSON.parse(fs.readFileSync(fName, 'utf8'));

    g.log(c.white('Using configuration:'), c.yellow(fName));

    if (!g.helper.isObject(conf.viewports)) {
        g.log(c.white('INFO: No common viewports defined'));
    }
}

function open() {
    if (g.helper.fileExists(g.configFile)) {
        try {
            processConfig(g.configFile);
        } catch (err) {
            g.log(c.red('Malformed configuration:', c.yellow(fName)));
        }
    } else {
        g.log(c.red('Configuration not found:'), c.yellow(g.configFile));
        g.log(c.red('Try running: linden init'));
    }
}

function init() {
    g.log(c.white('Working directory:'), c.yellow(g.cwd));
}

module.exports = {
    open: open,
    init: init
}
