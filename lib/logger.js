var g    = global.LINDEN;
var noop = function () {};

function log() {
    var date = new Date().toTimeString().slice(0, 8);

    process.stdout.write(`[${g.color.grey(date)}] `);
    console.log.apply(console, arguments);

    return this;
}

module.exports = function (opts) {
    opts = opts || {};

    return opts.silent ? noop : log
}
