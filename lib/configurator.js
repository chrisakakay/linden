var g       = global.LINDEN;
var fs      = require('fs');
var path    = require('path');
var c       = require('chalk');
var helper  = require('./helper');
var runner  = require('./runner');

function processConfig(fName) {
    g.config = JSON.parse(fs.readFileSync(fName, 'utf8'));
    g.log(c.white('Using configuration:'), c.yellow(fName));

    if (!g.config.dir) {
        g.log(c.white('No directory defined for saving files'));
        g.log(c.white('Using directory "./linden"'));
        g.config.dir = './linden';
    }

    /* Create folder if not exists
    var savePath = path.join(g.cwd, g.config.dir);

    if (!helper.folderExists(savePath)) {
        fs.mkdirSync(savePath);
    }
    */

    if (!helper.isObject(g.config.viewports)) {
        g.log(c.white('INFO: No common viewports defined'));
    }

    if (!helper.isArray(g.config.cases)) {
        g.log(c.white('INFO: No cases defined'));
    } else {
        g.config.cases.forEach(function(testCase) {
            runner.addCase(testCase);
        });

        runner.start();
    }
}

function open(fName) {
    if (helper.fileExists(fName)) {
        try {
            processConfig(fName);
        } catch (err) {
            g.log(c.red(err));
        }
    } else {
        g.log(c.red('Configuration not found:'), c.yellow(fName));
        g.log(c.red('Try running: linden init'));
    }
}

function init() {
    var newFile = path.join(g.cwd, g.defaultConfigName);

    g.log(c.white('Working directory:'), c.yellow(g.cwd));

    if (helper.fileExists(newFile)) {
        g.log(c.white('Config file already exists'));
        return;
    }

    try {
        g.log(c.white('Copying:'), c.yellow(g.defaultConfigPath));
        fs.writeFileSync(newFile, fs.readFileSync(g.defaultConfigPath));
        g.log(c.white('Done, try to run now'));
    } catch(err) {
        g.log(c.red(err));
    }
}

module.exports = {
    open: open,
    init: init
}
