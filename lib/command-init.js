'use strict';

const fs      = require('fs');
const path    = require('path');
const helper  = require('./helper');

module.exports = (configFileName) => {
    if (helper.fileExists(configFileName)) return false;

    try {
        fs.writeFileSync(configFileName, helper.getDefaultConfig());
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
