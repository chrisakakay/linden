var fs      = require('fs');
var path    = require('path');
var helper;
var runner;
var g;

function processConfig(fName) {
    var savePathRoot;
    var savePath;

    g.config = JSON.parse(fs.readFileSync(fName, 'utf8'));
    g.log('Using configuration:', fName);

    if (!helper.isArray(g.config.cases)) {
        g.log('No cases defined');
    } else {
        if (!g.config.dir) {
            g.config.dir = './linden';
            g.log('No root directory defined for saving files');
            g.log('Using directory "./linden"');
            g.log('Define "dir" parameter in the configuration if you want to use a different folder');
        }

        if (!helper.isObject(g.config.viewports)) {
            g.log('No common viewports defined');
        }

        savePathRoot = path.join(g.cwd, g.config.dir);
        savePath     = path.join(savePathRoot, g.runDateTime);

        if (!helper.folderExists(savePathRoot)) {
            fs.mkdirSync(savePathRoot);
        }

        fs.mkdirSync(savePath);
        g.log('Data will be saved to:', savePath);

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
            g.log(err);
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
    } catch (err) {
        g.log(err);
    }
}

module.exports = function (globalConfiguration) {
    g       = globalConfiguration;
    helper  = require('./helper')(g);
    runner  = require('./runner')(g);

    return {
        open: open,
        init: init,
        processConfig: processConfig
    };
};
