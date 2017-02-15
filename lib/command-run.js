'use strict';

const helper              = require('./helper');
const taskRunner          = require('linden-task-runner');
const configurationParser = require('linden-configuration-parser');

module.exports = configFileName => {
    if (!configFileName) return false;

    if (helper.fileExists(configFileName)) {
        const config = configurationParser(configFileName);

        taskRunner.init(config);
    } else {
        console.log('Configuration not found:', configFileName);
    }
};
