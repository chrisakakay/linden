var fs      = require('fs');
var path    = require('path');
var helper  = require('./helper');
var cases   = [];
var g;

function validateCase(testCase) {
    // Should handle viewport width/height aswell
    if (!testCase || !testCase.name || !testCase.url || !helper.isObject(testCase.viewport)) {
        g.log('Invalid case');
        return false;
    }

    return true;
}

function parseConfiguration(fName) {
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

        savePathRoot = path.join(g.cwd, g.config.dir);
        savePath     = path.join(savePathRoot, g.runDateTime);

        if (!helper.folderExists(savePathRoot)) {
            fs.mkdirSync(savePathRoot);
        }

        fs.mkdirSync(savePath);
        g.log('Data will be saved to:', savePath);

        cases = [];

        g.config.cases.forEach(function(testCase) {
            testCase.isValid = validateCase(testCase);
            cases.push(testCase);
        });

        return cases;
    }
}

module.exports = function (globalConfiguration) {
    g = globalConfiguration;

    return {
        parseConfiguration: parseConfiguration,
        validateCase:       validateCase
    };
};
