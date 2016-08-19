var path        = require('path');
var webdriver   = require('selenium-webdriver');
var helper      = require('./helper');
var phantom     = webdriver.Capabilities.phantomjs().set('phantomjs.binary.path', require('phantomjs-prebuilt').path);
var driver      = null;
var cases       = [];
var g;

function runNext() {
    if (cases.length === 0) {
        driver.quit();
        driver = null;
        g.log('Done');
        return;
    }

    var testCase = cases.shift();

    g.log('Running:', testCase.name, `(${testCase.url})`);

    driver.manage().deleteAllCookies();
    driver.manage().window().setSize(testCase.viewport.width, testCase.viewport.height);
    driver.get(testCase.url).then(function () {
        driver.takeScreenshot().then(function(image, err) {
            helper.savePNG(path.join(g.cwd, g.config.dir, g.runDateTime, `${testCase.name}.png`), image);
            runNext();
        });
    });
}

function getCases() {
    return cases;
}

function getDriver() {
    return driver;
}

function reset() {
    cases = [];

    if (driver) {
        driver.quit();
        driver = null;
    }
}

function start(newCases) {
    cases = newCases || [];

    if (cases.length > 0 && driver === null) {
        init();
        driver.get('about:blank').then(function () {
            g.log('Cases to run:', `${cases.length}`);
            runNext();
        });
    } else if (driver !== null) {
        g.log('Driver already initialized');
    } else {
        g.log('Nothing to run');
    }
}

function init() {
    g.log('Initializing driver');
    driver = new webdriver.Builder().withCapabilities(phantom).build();

    return this;
}

module.exports = function (globalConfiguration) {
    g = globalConfiguration;

    return {
        init:       init,
        start:      start,
        reset:      reset,
        getCases:   getCases,
        getDriver:  getDriver
    };
};
