var g  = global.LINDEN;
var fs = require('fs');

function fileExists(fName) {
    try {
        return fs.statSync(fName).isFile();
    } catch (err) {
        return false;
    }
}

function folderExists(fName) {
    try {
        return fs.statSync(fName).isDirectory();
    } catch (err) {
        return false;
    }
}

function isObject(obj) {
    return (obj !== undefined && obj !== '' && obj !== null && obj.constructor === Object && Object.keys(obj).length > 0);
}

function isArray(arr) {
    return (arr !== undefined && arr !== '' && arr !== null && arr.constructor === Array && arr.length > 0);
}

function printVersion() {
    g.log('CLI version', g.package.version);
}

function printHelp() {
    g.log([
        'Usage: linden [command] [options]',
        '',
        'Options:',
        '  -v, --version\t prints the version',
        '  -s, --silent \t turns of logging',
        '  -c, --config \t specifies config file',
        '',
        'Commands:',
        '  init\t\tinitializes configuration file',
        '  run \t\truns the regression',
        '',
        'The default command is: run'
    ].join('\n'));
}

module.exports = {
    fileExists:     fileExists,
    folderExists:   folderExists,
    printVersion:   printVersion,
    printHelp:      printHelp,
    isObject:       isObject,
    isArray:        isArray
}
