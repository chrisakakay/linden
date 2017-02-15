'use strict';

const fs    = require('fs');
const path  = require('path');

module.exports.fileExists = fileName => {
    try {
        return fs.statSync(fileName).isFile();
    } catch (err) {
        return false;
    }
};

module.exports.getDefaultConfig = () => {
    return fs.readFileSync(path.join(path.dirname(process.argv[1]), '../config/linden.json'));
};
