var g   = global.LINDEN;
var fs  = require('fs');

function processConfig(fName) {
    var conf = JSON.parse(fs.readFileSync(fName, 'utf8'));

    g.log(g.color.white('Using configuration:'), g.color.yellow(fName));

    if (!g.helper.isObject(conf.viewports)) {
        g.log(g.color.white('INFO: No common viewports defined'));
    }
}

function open() {
    if (g.helper.fileExists(g.configFile)) {
        try {
            processConfig(g.configFile);
        } catch (err) {
            g.log(g.color.red('Malformed configuration:', g.color.yellow(fName)));
        }
    } else {
        g.log(g.color.red('Configuration not found:'), g.color.yellow(g.configFile));
        g.log(g.color.red('Try running: linden init'));
    }
}

function init() {
    g.log(g.color.white('Working directory:'), g.color.yellow(g.cwd));
}

module.exports = {
    open: open,
    init: init
}
