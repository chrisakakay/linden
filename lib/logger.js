var chalk       = require('chalk');
var prettyHrt   = require('pretty-hrtime');

var noop        = function () {};

function time(time) {
    return prettyHrt(process.hrtime(time));
}

function log() {
    var date = new Date().toTimeString().slice(0, 8);

    process.stdout.write(`[${chalk.grey(date)}] `);
    console.log.apply(console, arguments);

    return this;
}

module.exports = function (opts) {
    opts = opts || {};

    return {
        log:    opts.silent ? noop : log,
        time:   time,
        color:  chalk
    };
}
