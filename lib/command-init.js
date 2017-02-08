'use strict';

const fs      = require('fs');
const path    = require('path');
const helper  = require('./helper');

module.exports = () => {
    const fileName = path.join(helper.getCWD(), 'linden.json');

    if (helper.fileExists(fileName)) return;

    try {
        fs.writeFileSync(fileName, helper.getDefaultConfig());
    } catch (err) {
        console.log(err);
    }
};
