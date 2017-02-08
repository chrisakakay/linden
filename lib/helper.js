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

module.exports.folderExists = folderName => {
    try {
        return fs.statSync(folderName).isDirectory();
    } catch (err) {
        return false;
    }
};

module.exports.isObject = obj => {
    return (obj !== undefined && obj !== '' && obj !== null && obj.constructor === Object && Object.keys(obj).length > 0);
};

module.exports.isArray = arr => {
    return (arr !== undefined && arr !== '' && arr !== null && arr.constructor === Array && arr.length > 0);
};

module.exports.getCWD = () => {
    return process.cwd();
};

module.exports.getBasePath = () => {
    return process.argv[1];
};

module.exports.getDefaultConfig = () => {
    return fs.readFileSync(path.join(path.dirname(process.argv[1]), '../config/linden.json'));
};

module.exports.log = () => {
    const date = new Date().toTimeString().slice(0, 8);

    console.log.apply(console, [date, '-'].concat(Array.from(arguments)));
};
