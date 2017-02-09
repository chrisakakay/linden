'use strict';

const fs            = require('fs');
const path          = require('path');
const helper        = require('./helper');
const testRunner    = require('./test-runner');

function validateCase(testCase) {
    // Should handle viewport width/height aswell
    if (!testCase || !testCase.name || !testCase.url || !helper.isObject(testCase.viewport)) {
        return false;
    }

    return true;
}

function parseConfiguration(configFileName) {
    let config      = JSON.parse(fs.readFileSync(configFileName, 'utf8'));

    let tempConfig  = {
            cases: []
        };

    if (!helper.isArray(config.cases)) return tempConfig;

    tempConfig.timestamp    = Date.now().toString();
    tempConfig.dir          = config.dir ? config.dir : './linden';

    config.cases.forEach((testCase) => {
        testCase.isValid = validateCase(testCase);
        tempConfig.cases.push(testCase);
    });



    let savePathRoot = path.join(helper.getCWD(), tempConfig.dir);
    let savePath     = path.join(savePathRoot, tempConfig.timestamp);

    if (!helper.folderExists(savePathRoot)) {
        fs.mkdirSync(savePathRoot);
    }

    fs.mkdirSync(savePath);
    return tempConfig;
}

module.exports = configFileName => {
    if (!configFileName) return false;

    if (helper.fileExists(configFileName)) {
        const config = parseConfiguration(configFileName);

        testRunner.init(config);
    } else {
        console.log('Configuration not found:', configFileName);
    }
};
