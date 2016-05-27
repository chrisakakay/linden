var g       = global.LINDEN;
var fs      = require('fs');
var path    = require('path');;
var helper  = require('./helper');
var runner  = require('./runner');

function processConfig(fName) {
    g.config = JSON.parse(fs.readFileSync(fName, 'utf8'));
    g.log('Using configuration:', fName);

    if (!g.config.dir) {
        g.log('No directory defined for saving files');
        g.log('Using directory "./linden"');
        g.config.dir = './linden';
    }

    /* Create folder if not exists
    var savePath = path.join(g.cwd, g.config.dir);

    if (!helper.folderExists(savePath)) {
        fs.mkdirSync(savePath);
    }
    */

    if (!helper.isObject(g.config.viewports)) {
        g.log('INFO: No common viewports defined');
    }

    if (!helper.isArray(g.config.cases)) {
        g.log('INFO: No cases defined');
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
        g.log('Configuration not found:', fName);
        g.log('Try running: linden init');
    }
}

function init() {
    var newFile = path.join(g.cwd, g.defaultConfigName);

    g.log('Working directory:', g.cwd);

    if (helper.fileExists(newFile)) {
        g.log('Config file already exists');
        return;
    }

    try {
        g.log('Copying:', g.defaultConfigPath);
        fs.writeFileSync(newFile, fs.readFileSync(g.defaultConfigPath));
        g.log('Done, try to run now');
    } catch(err) {
        g.log(err);
    }
}

module.exports = {
    open: open,
    init: init,
    processConfig: processConfig
}
