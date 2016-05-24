var g  = global.LINDEN;
var fs = require('fs');

function fileExists(fname) {
    try {
        return fs.statSync(fname).isFile();
    } catch (err) {
        return false;
    }
}

function isObject(obj) {
    return (obj !== undefined && obj !== '' && obj !== null && obj.constructor === Object && Object.keys(obj).length > 0);
}

/* istanbul ignore next */
function printVersion() {
    g.log('CLI version', g.package.version);
}

/* istanbul ignore next */
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
    printVersion:   printVersion,
    printHelp:      printHelp,
    isObject:       isObject
}
