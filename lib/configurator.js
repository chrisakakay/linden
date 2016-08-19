var fs      = require('fs');
var path    = require('path');
var helper  = require('./helper');
var runner;
var parser;
var g;

function open(fName) {
    if (helper.fileExists(fName)) {
        try {
            runner.start(parser.parseConfiguration(fName));
        } catch (err) {
            // g.log(err);
            g.log('File error.');
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
    runner  = require('./runner')(g);
    parser  = require('./parser')(g);

    return {
        open: open,
        init: init
    };
};
