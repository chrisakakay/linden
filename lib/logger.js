var g       = global.LINDEN;
var noop    = function () {};
var c       = require('chalk');

var options = {};

function log() {
    var date = new Date().toTimeString().slice(0, 8);

    process.stdout.write(`[${c.grey(date)}] `);
    console.log.apply(console, arguments);

    return this;
}

module.exports = function (opts) {
    options = opts || {};

    return options.silent ? noop : log
}
